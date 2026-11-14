"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type State = "idle" | "sending" | "done" | "error";

export function FeaturedForm({ plan }: { plan: "week" | "month" }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    agentName: "",
    phone: "",
    suburb: "",
    postUrl: "",
    notes: "",
  });

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const setText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, notes: event.target.value }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const res = await fetch("/api/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error ?? "Request failed");

      setState("done");
      setMessage(
        "Got it. Check your inbox — we'll confirm as soon as your post is live.",
      );
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "That did not work. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="mt-10 rounded-lg border border-line bg-card p-8">
        <p className="font-[family-name:var(--font-display)] text-[28px] leading-tight text-ink">
          Thank you.
        </p>
        <p className="mt-3 text-[16px] leading-[1.7] text-muted">{message}</p>
      </div>
    );
  }

  const field =
    "h-12 w-full rounded-md border border-line bg-card px-4 text-[15px] text-ink placeholder:text-muted/60 focus:border-ink/40 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4">
      <div>
        <label htmlFor="email" className="label">
          Email used at checkout
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@youragency.com"
          className={`${field} mt-2`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="agentName" className="label">
            Name on the post
          </label>
          <input
            id="agentName"
            required
            value={form.agentName}
            onChange={set("agentName")}
            placeholder="Your name"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <input
            id="phone"
            required
            value={form.phone}
            onChange={set("phone")}
            placeholder="Your number"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="suburb" className="label">
          Suburb
        </label>
        <input
          id="suburb"
          required
          value={form.suburb}
          onChange={set("suburb")}
          placeholder="Onehunga"
          className={`${field} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="postUrl" className="label">
          Link to the post
        </label>
        <input
          id="postUrl"
          value={form.postUrl}
          onChange={set("postUrl")}
          placeholder="Canva, Drive or Instagram link"
          className={`${field} mt-2`}
        />
        <p className="mt-2 text-[12px] text-muted">
          No link handy? Send the image in a reply to your confirmation email.
        </p>
      </div>

      <div>
        <label htmlFor="notes" className="label">
          Anything we should know
        </label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={setText}
          className="mt-2 w-full rounded-md border border-line bg-card p-4 text-[15px] text-ink placeholder:text-muted/60 focus:border-ink/40 focus:outline-none"
          placeholder="Optional"
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-light transition-all duration-200 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending" : "Send it"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>

      {state === "error" ? (
        <p role="alert" className="text-[14px] text-primary">
          {message}
        </p>
      ) : null}
    </form>
  );
}
