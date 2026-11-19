"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { formats } from "@/content/formats";
import { Glow } from "../glow";
import { PostPreview } from "../post-preview";

const lines = ["Post like", "your listing", "deserves it."];

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[112px] md:pb-24 md:pt-[140px]">
      <Glow />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8">
        <div>
          <motion.p className="label" {...rise(0)}>
            Social posts &amp; captions for solo agents
          </motion.p>

          <h1 className="display mt-5 text-balance text-[clamp(38px,6.4vw,88px)] text-ink">
            {lines.map((line, i) => (
              <motion.span key={line} className="block" {...rise(i + 1)}>
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-muted sm:mt-7 sm:text-[18px] sm:leading-[1.65]"
            {...rise(4)}
          >
            Send us your listing link or photos and we send back finished posts with the
            captions already written. One active request at a time, delivered in 48 hours.
            Your price drops 5% every month you stay.
          </motion.p>

          <motion.div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center" {...rise(5)}>
            <a
              href="#free"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-medium text-light transition-all duration-200 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.985] sm:w-auto"
            >
              Get 5 free samples + 1 custom post
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#pricing"
              className="inline-flex min-h-11 items-center px-1 text-[14px] font-medium text-muted underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-ink"
            >
              See how pricing works
            </a>
          </motion.div>

          <motion.p className="mt-8 text-[13px] text-muted" {...rise(6)}>
            48-hour turnaround · captions written · one active request at a time · cancel any time
          </motion.p>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[440px] sm:h-[490px] lg:h-[540px]">
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* back cards, mostly hidden, for depth */}
            <div className="absolute left-[1%] top-[21%] z-10 w-[205px] -rotate-[13deg] opacity-55 sm:w-[220px]">
              <PostPreview post={formats[0].post} format={formats[0].name} />
            </div>
            <div className="absolute left-[46%] top-[13%] z-10 w-[195px] rotate-[12deg] opacity-55 sm:w-[210px]">
              <PostPreview post={formats[4].post} format={formats[4].name} />
            </div>

            {/* front card */}
            <FloatCard className="absolute left-[17%] top-[13%] z-20 w-[240px] rotate-[1.5deg] sm:w-[255px]" reduce={!!reduce}>
              <PostPreview post={formats[3].post} format={formats[3].name} />
            </FloatCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  children,
  className,
  reduce,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  reduce: boolean;
  delay?: number;
}) {
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
