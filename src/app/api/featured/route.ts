import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PLANS = new Set(["week", "month"]);

type Body = {
  email?: string;
  plan?: string;
  agentName?: string;
  phone?: string;
  suburb?: string;
  description?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const agentName = (body.agentName ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const suburb = (body.suburb ?? "").trim();
  const description = (body.description ?? "").trim();
  const notes = (body.notes ?? "").trim();
  const plan = PLANS.has(body.plan ?? "") ? (body.plan as string) : "week";
  // plan stays URL-safe for the email button; plan_label is the human duration.
  const planLabel = plan === "month" ? "30 days" : "7 days";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!agentName || !phone || !suburb || !description) {
    return NextResponse.json(
      { error: "Name, phone, suburb and a description are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_FEATURED_GROUP_ID;

  if (!apiKey || !groupId) {
    console.log("[featured] no provider configured", { email, plan, description });
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
          agent_name: agentName,
          phone,
          suburb,
          plan,
          plan_label: planLabel,
          post_description: description,
          notes,
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[featured] mailerlite error", res.status, detail);
      return NextResponse.json({ error: "Could not save your details." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, mode: "mailerlite" });
  } catch (error) {
    console.error("[featured] network error", error);
    return NextResponse.json({ error: "Network error. Try again." }, { status: 502 });
  }
}
