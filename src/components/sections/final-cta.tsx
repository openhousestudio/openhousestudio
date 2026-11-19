"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "done" | "error";

const MAILERLITE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2792775/forms/204023150533412359/subscribe";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_PATTERN = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i;

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  function reset() {
    setState("idle");
    setMessage("");
    setEmail("");
    setListingUrl("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const trimmedEmail = email.trim();
    const trimmedListing = listingUrl.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setState("error");
      setMessage("Enter an email address like name@agency.co.nz so we can send the pack.");
      return;
    }

    if (trimmedListing && !URL_PATTERN.test(trimmedListing)) {
      setState("error");
      setMessage(
        "That listing link is missing its start. Paste the full address, including https://.",
      );
      return;
    }

    setState("sending");

    try {
      const form = new FormData();
      form.append("fields[email]", trimmedEmail);
      if (trimmedListing) {
        form.append("fields[company]", trimmedListing);
      }
      form.append("ml-submit", "1");
      form.append("anticsrf", "true");

      // Also notify the fallback API route if a listing URL is supplied, so nothing is lost.
      if (trimmedListing) {
        fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmedEmail,
            listingUrl: trimmedListing,
            source: "free-custom-post",
          }),
        }).catch(() => null);
      }

      const res = await fetch(MAILERLITE_ENDPOINT, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        setState("error");
        setMessage(
          "The form service is not answering right now. Try again in a minute, or email hello@openhousestudio.online and we will send the pack by hand.",
        );
        return;
      }

      // MailerLite answers 200 even when validation fails, so read the body.
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;

      if (!data || data.success !== true) {
        setState("error");
        setMessage(
          "We could not add that address. Check the email spelling, or write to hello@openhousestudio.online and we will send the pack by hand.",
        );
        return;
      }

      setState("done");
      setMessage(
        trimmedListing
          ? "Check your inbox for the five sample posts. Your custom post for that listing follows in 48 hours."
          : "Check your inbox. The five sample posts and captions are on their way.",
      );
    } catch {
      setState("error");
      setMessage(
        "We could not reach the form from this browser. Check your connection and try again, or email hello@openhousestudio.online.",
      );
    }
  }

  return (
    <section id="free" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[820px] px-6 py-24 text-center lg:py-32">
        <p className="label">Try us on a real listing</p>
        <h2 className="display mt-4 text-[clamp(32px,5vw,64px)] text-ink">
          See your own listing in our style.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.7] text-muted">
          Get our five sample posts with captions immediately. Paste a link to one of your
          active listings and we will also design one custom post and caption for it, free,
          in 48 hours. No card.
        </p>

        {state === "done" ? (
          <div className="mx-auto mt-8 max-w-[46ch]">
            <p aria-live="polite" className="text-[16px] leading-[1.6] text-ink">
              {message}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex min-h-11 items-center rounded-full border border-line px-5 text-[14px] font-medium text-ink transition-all duration-150 hover:-translate-y-px hover:border-ink/40 active:translate-y-0"
            >
              Send another link
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="mx-auto mt-9 flex w-full max-w-[520px] flex-col gap-4 text-left"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-[12px] font-medium uppercase tracking-[0.14em] text-muted"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@youragency.co.nz"
                className="mt-2 h-12 w-full rounded-lg border border-line bg-card px-4 text-[15px] text-ink placeholder:text-muted/60"
              />
            </div>

            <div>
              <label
                htmlFor="listing-url"
                className="block text-[12px] font-medium uppercase tracking-[0.14em] text-muted"
              >
                Optional: paste a listing link for 1 free custom post
              </label>
              <input
                id="listing-url"
                name="listing-url"
                type="url"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="https://www.yourbrand.co.nz/listing/awa-road"
                className="mt-2 h-12 w-full rounded-lg border border-line bg-card px-4 text-[15px] text-ink placeholder:text-muted/60"
              />
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-light transition-all duration-150 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.985] disabled:opacity-60"
            >
              {state === "sending" ? "Sending" : "Get the free sample pack"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>

            <p className="text-[12px] leading-[1.6] text-muted">
              By subscribing you agree to receive occasional emails from Open House Studio.
              Unsubscribe any time.
            </p>
          </form>
        )}

        {state === "error" && (
          <p
            role="alert"
            aria-live="assertive"
            className="mx-auto mt-4 max-w-[46ch] text-[14px] leading-[1.6] text-primary"
          >
            {message}
          </p>
        )}

        <div className="mx-auto mt-14 max-w-[480px] border-t border-line pt-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
            Founder offer · {site.founder.spots} spots
          </p>
          <p className="mt-3 text-[16px] leading-[1.7] text-ink">
            Ready to hand off your listing posts now? Founding agents pay $
            {site.founder.price} a month, locked for as long as they stay, with 48-hour
            delivery on one active request at a time.
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
