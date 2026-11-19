import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: string; listingUrl?: string; source?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const listingUrl = (body.listingUrl ?? "").trim().slice(0, 500);

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // No credentials yet: accept the signup and log it, so the page can ship before
  // the email provider is wired up.
  if (!apiKey || !groupId) {
    console.log("[subscribe] no provider configured", {
      email,
      listingUrl: listingUrl || undefined,
      source: body.source,
    });
    return NextResponse.json({ ok: true, mode: "log" });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        fields: {
          source: body.source ?? "landing",
          ...(listingUrl ? { company: listingUrl } : {}),
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[subscribe] mailerlite error", res.status, detail);
      return NextResponse.json({ error: "Provider error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, mode: "mailerlite" });
  } catch (error) {
    console.error("[subscribe] network error", error);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
