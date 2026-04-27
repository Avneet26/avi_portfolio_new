"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface DottedGlobeProps {
  width?: number
  height?: number
  className?: string
}

export default function DottedGlobe({ width = 600, height = 600, className = "" }: DottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = width
    const h = height
    const radius = Math.min(w, h) / 2.2

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    // Theme colors — cyan water, orange land
    const OCEAN_FILL    = "rgba(88,174,195,0.13)"
    const GLOBE_STROKE  = "#58aec3"          // --color-cyan-500
    const GRID_STROKE   = "rgba(88,174,195,0.32)"
    const OUTLINE_STROKE = "rgba(255,138,71,0.65)"  // --color-orange-500
    const DOT_FILL      = "#ff8a47"          // --color-orange-500

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([w / 2, h / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(ctx)

    // Point-in-polygon helpers
    const pip = (point: [number, number], ring: number[][]): boolean => {
      let inside = false
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i], [xj, yj] = ring[j]
        if (yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi)
          inside = !inside
      }
      return inside
    }

    const inFeature = (pt: [number, number], feature: any): boolean => {
      const { type, coordinates } = feature.geometry
      if (type === "Polygon") {
        if (!pip(pt, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) if (pip(pt, coordinates[i])) return false
        return true
      }
      if (type === "MultiPolygon") {
        for (const poly of coordinates) {
          if (!pip(pt, poly[0])) continue
          let hole = false
          for (let i = 1; i < poly.length; i++) if (pip(pt, poly[i])) { hole = true; break }
          if (!hole) return true
        }
      }
      return false
    }

    const buildDots = (feature: any, step = 1.4): [number, number][] => {
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
      const dots: [number, number][] = []
      for (let lng = minLng; lng <= maxLng; lng += step)
        for (let lat = minLat; lat <= maxLat; lat += step)
          if (inFeature([lng, lat], feature)) dots.push([lng, lat])
      return dots
    }

    interface Dot { lng: number; lat: number }
    const allDots: Dot[] = []
    let landFeatures: any = null
    const rotation = [0, 0]

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Ocean fill
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, projection.scale(), 0, 2 * Math.PI)
      ctx.fillStyle = OCEAN_FILL
      ctx.fill()

      // Globe border
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, projection.scale(), 0, 2 * Math.PI)
      ctx.strokeStyle = GLOBE_STROKE
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.8
      ctx.stroke()
      ctx.globalAlpha = 1

      if (!landFeatures) return

      // Graticule grid
      const graticule = d3.geoGraticule()
      ctx.beginPath()
      path(graticule())
      ctx.strokeStyle = GRID_STROKE
      ctx.lineWidth = 0.6
      ctx.globalAlpha = 0.7
      ctx.stroke()
      ctx.globalAlpha = 1

      // Land outlines
      ctx.beginPath()
      landFeatures.features.forEach((f: any) => path(f))
      ctx.strokeStyle = OUTLINE_STROKE
      ctx.lineWidth = 1.4
      ctx.stroke()

      // Dots
      const s = projection.scale() / radius
      allDots.forEach(({ lng, lat }) => {
        const p = projection([lng, lat])
        if (!p || p[0] < 0 || p[0] > w || p[1] < 0 || p[1] > h) return
        ctx.beginPath()
        ctx.arc(p[0], p[1], 1.1 * s, 0, 2 * Math.PI)
        ctx.fillStyle = DOT_FILL
        ctx.globalAlpha = 0.72
        ctx.fill()
        ctx.globalAlpha = 1
      })
    }

    const load = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        )
        landFeatures = await res.json()
        landFeatures.features.forEach((f: any) => {
          buildDots(f, 1.4).forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })
        setReady(true)
        render()
      } catch {
        // fail silently — globe still shows with just the grid
        setReady(true)
      }
    }

    const timer = d3.timer(() => {
      rotation[0] += 0.3
      projection.rotate(rotation)
      render()
    })

    load()

    return () => { timer.stop() }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "100%", height: "auto", opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
    />
  )
}
