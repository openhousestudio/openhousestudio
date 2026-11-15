"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type State = "idle" | "loading" | "error";

export function SubscribeButton({
  label = "Subscribe",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<State>("idle");

  async function onClick() {
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json().catch(() => null)) as {
        url?: string;
      } | null;
      if (!res.ok || !data?.url) throw new Error("No checkout URL");
      window.location.href = data.url;
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={state === "loading"}
        className={className || "inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-primary disabled:opacity-70"}
      >
        {state === "loading" ? "Opening checkout…" : label}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
      {state === "error" ? (
        <p className="mt-2 text-[13px] text-bg/60" role="alert">
          Checkout did not open. Try again in a moment.
        </p>
      ) : null}
    </div>
  );
}
