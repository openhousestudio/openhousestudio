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
        "relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-sm bg-light p-5 shadow-[0_18px_50px_-24px_rgba(26,23,20,0.35)] ring-1 ring-line transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_64px_-30px_rgba(26,23,20,0.45)]",
        className
      )}
    >
      {/* decorative arch, like a doorway */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-40 rounded-t-full bg-sand/70"
      />
      <div className="relative">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
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

      <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-[0.14em] text-muted/70">
        {format}
      </span>
    </div>
  );
}
