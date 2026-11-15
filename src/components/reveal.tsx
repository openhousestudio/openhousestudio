import type { ReactNode } from "react";

/**
 * Sections used to fade in on scroll. The design check flags scroll-triggered
 * reveals as hidden content, so this now renders in place. Kept as a wrapper so
 * existing call sites keep working.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
