"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Glow } from "../glow";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "done" | "error";

const MAILERLITE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2792775/forms/204023150533412359/subscribe";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    setState("sending");
    const trimmedListing = listingUrl.trim();
    try {
      const form = new FormData();
      form.append("fields[email]", email);
      if (trimmedListing) {
        form.append("fields[company]", trimmedListing);
      }
      form.append("ml-submit", "1");
      form.append("anticsrf", "true");

      // Also notify fallback API route if listing URL is supplied so nothing is lost in server logs
      if (trimmedListing) {
        fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, listingUrl: trimmedListing, source: "free-custom-post" }),
        }).catch(() => null);
      }

      const res = await fetch(MAILERLITE_ENDPOINT, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Request failed");

      // MailerLite answers 200 even when validation fails, so read the body.
      const data = (await res.json().catch(() => null)) as
        | { success?: boolean }
        | null;
      if (!data || data.success !== true) throw new Error("Provider rejected");

      setState("done");
      setMessage(
        trimmedListing
          ? "Check your inbox for the five sample posts—and watch for your custom listing post within 48 hours."
          : "Check your inbox. The five sample posts and captions are on their way.",
      );
    } catch {
      setState("error");
      setMessage("That did not work. Try again in a moment.");
    }
  }

  return (
    <section id="free" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      <Glow />
      <div className="relative mx-auto max-w-[820px] px-6 py-24 text-center lg:py-32">
        <p className="label">Try us on a real listing</p>
        <h2 className="display mt-4 text-[clamp(32px,5vw,64px)] text-ink">
          See your own listing in our style.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-muted">
          Get our five sample posts with captions immediately. Paste a link to one of your
          active listings and we will also design one custom post and caption for it—free,
          in 48 hours. No card.
        </p>

        {state === "done" ? (
          <p className="mx-auto mt-8 max-w-[46ch] text-[16px] text-ink">{message}</p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex w-full max-w-[520px] flex-col gap-3"
          >
            <div>
              <label htmlFor="listing-url" className="sr-only">
                Optional link to your active listing
              </label>
              <input
                id="listing-url"
                type="url"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="Optional: paste a listing link for 1 free custom post (https://...)"
                className="h-12 w-full rounded-full border border-line bg-card px-5 text-[14px] text-ink placeholder:text-muted/70"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@youragency.com"
                className="h-12 flex-1 rounded-full border border-line bg-card px-5 text-[15px] text-ink placeholder:text-muted/70"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-light transition-all duration-150 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.985] disabled:opacity-60"
              >
                {state === "sending" ? "Sending" : "Send my free pack"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </form>
        )}

        {state === "error" && (
          <p role="alert" className="mt-3 text-[14px] text-primary">
            {message}
          </p>
        )}

        <p className="mt-4 text-[12px] text-muted">
          By subscribing you agree to receive occasional emails from Open House Studio.
          Unsubscribe any time.
        </p>

        <div className="mx-auto mt-14 max-w-[480px] border-t border-line pt-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            Founder offer · {site.founder.spots} spots
          </p>
          <p className="mt-3 text-[16px] leading-[1.7] text-ink">
            Ready to hand off your listing posts now? Founding agents pay $
            {site.founder.price} a month, locked for as long as they stay, with 48-hour
            turnaround on one active request at a time.
          </p>
          <a
            href={site.founder.checkoutUrl}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-primary"
          >
            Claim a founder spot (${site.founder.price}/mo)
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="mt-3 text-[12px] text-muted">
            Cancel any time. 7-day full refund guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
