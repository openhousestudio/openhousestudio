import clsx from "clsx";
import type { Format } from "@/content/formats";

export function PostPreview({
  post,
  format,
  className,
}: {
  post: Format["post"];
  format: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-sm bg-light p-5 shadow-[0_18px_50px_-24px_rgba(26,23,20,0.35)] ring-1 ring-line",
        className
      )}
    >
      <div className="relative">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          {post.kicker}
        </p>
        <p className="display mt-3 text-[26px] leading-[1.05] text-ink">{post.title}</p>
      </div>

      <div className="relative">
        <div className="mb-4 h-px w-10 bg-accent" />
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{post.meta}</p>
        <p className="mt-2 font-sans text-[15px] font-semibold tabular-nums text-ink">
          {post.price}
        </p>
      </div>

      <span className="absolute bottom-3 right-4 text-[11px] uppercase tracking-[0.14em] text-muted">
        {format}
      </span>
    </div>
  );
}
