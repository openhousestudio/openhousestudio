import type { ReactNode } from "react";

/**
 * A pass-through wrapper. The scroll fade-in it used to run shipped every
 * section with `opacity: 0` in the server-rendered HTML and wrapped `<li>`
 * items in a `<div>`, so it now only exists to carry an optional className.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
