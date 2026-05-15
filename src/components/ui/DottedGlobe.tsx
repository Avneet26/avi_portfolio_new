"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DottedGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

type LngLat = [number, number];
type LinearRing = LngLat[];
type PolygonGeometry = { type: "Polygon"; coordinates: LinearRing[] };
type MultiPolygonGeometry = { type: "MultiPolygon"; coordinates: LinearRing[][] };
type LandGeometry = PolygonGeometry | MultiPolygonGeometry;
type LandFeature = { geometry: LandGeometry };
type LandFeatureCollection = { features: LandFeature[] };

const LAND_DATA_URL =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";
const DOT_STEP = 1.4;

export default function DottedGlobe({
  width = 600,
  height = 600,
  className = "",
}: DottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const w = width;
    const h = height;
    const radius = Math.min(w, h) / 2.2;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const OCEAN_FILL = "rgba(88,174,195,0.13)";
    const GLOBE_STROKE = "#58aec3";
    const GRID_STROKE = "rgba(88,174,195,0.32)";
    const OUTLINE_STROKE = "rgba(255,138,71,0.65)";
    const DOT_FILL = "#ff8a47";

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([w / 2, h / 2])
      .clipAngle(90);
    const path = d3.geoPath().projection(projection).context(ctx);

    const pip = (point: LngLat, ring: LinearRing): boolean => {
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        if (yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const inFeature = (pt: LngLat, feature: LandFeature): boolean => {
      const { type, coordinates } = feature.geometry;
      if (type === "Polygon") {
        if (!pip(pt, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pip(pt, coordinates[i])) return false;
        }
        return true;
      }

      for (const poly of coordinates) {
        if (!pip(pt, poly[0])) continue;
        let hole = false;
        for (let i = 1; i < poly.length; i++) {
          if (pip(pt, poly[i])) {
            hole = true;
            break;
          }
        }
        if (!hole) return true;
      }
      return false;
    };

    const buildDots = (feature: LandFeature, step = DOT_STEP): LngLat[] => {
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature as unknown as d3.GeoPermissibleObjects);
      const dots: LngLat[] = [];
      for (let lng = minLng; lng <= maxLng; lng += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          if (inFeature([lng, lat], feature)) dots.push([lng, lat]);
        }
      }
      return dots;
    };

    type Dot = { lng: number; lat: number };
    const allDots: Dot[] = [];
    let landFeatures: LandFeatureCollection | null = null;
    const rotation: [number, number] = [0, 0];
    const graticule = d3.geoGraticule();

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(w / 2, h / 2, projection.scale(), 0, 2 * Math.PI);
      ctx.fillStyle = OCEAN_FILL;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(w / 2, h / 2, projection.scale(), 0, 2 * Math.PI);
      ctx.strokeStyle = GLOBE_STROKE;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (!landFeatures) return;

      ctx.beginPath();
      path(graticule());
      ctx.strokeStyle = GRID_STROKE;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      landFeatures.features.forEach((feature) => {
        path(feature as unknown as d3.GeoPermissibleObjects);
      });
      ctx.strokeStyle = OUTLINE_STROKE;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      const s = projection.scale() / radius;
      allDots.forEach(({ lng, lat }) => {
        const p = projection([lng, lat]);
        if (!p || p[0] < 0 || p[0] > w || p[1] < 0 || p[1] > h) return;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 1.1 * s, 0, 2 * Math.PI);
        ctx.fillStyle = DOT_FILL;
        ctx.globalAlpha = 0.72;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const controller = new AbortController();
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(LAND_DATA_URL, { signal: controller.signal });
        const data = (await res.json()) as LandFeatureCollection;
        landFeatures = data;
        data.features.forEach((feature) => {
          buildDots(feature).forEach(([lng, lat]) => allDots.push({ lng, lat }));
        });
      } catch {
        // fail silently — globe still shows with ocean + grid
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    let paused = false;
    const io = new IntersectionObserver(([entry]) => {
      paused = !entry.isIntersecting;
    }, { threshold: 0 });
    io.observe(canvas);

    const rotateSpeed = isMobile ? 0.2 : 0.3;
    const timer = d3.timer(() => {
      if (paused) return;
      rotation[0] += rotateSpeed;
      projection.rotate(rotation);
      render();
    });

    load();

    return () => {
      timer.stop();
      io.disconnect();
      controller.abort();
      cancelled = true;
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
    />
  );
}
