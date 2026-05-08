import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  outline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

const sizes = {
  sm: "text-4xl md:text-5xl",
  md: "text-5xl md:text-6xl",
  lg: "text-4xl sm:text-5xl md:text-7xl",
  xl: "text-6xl md:text-8xl lg:text-[10rem]",
};

export default function BlockHeading({
  children,
  outline = false,
  size = "lg",
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <Tag
      className={clsx(
        "font-display font-black uppercase leading-[0.85] tracking-[-0.01em]",
        sizes[size],
        outline && "text-outline",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
