import type { ReactNode } from "react";

/**
 * Fades and lifts its child in as it enters the viewport. The animation is CSS
 * (`.reveal` in globals.css), so server-rendered HTML stays visible.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}
