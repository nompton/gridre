"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

// "What's your home worth?" seller lead magnet. Posts to the same GRID public
// endpoint as the contact form, but with form_type: "home_value" so ATLAS tags
// it as a seller lead, captures the address, queues a follow-up, and enrolls
// the person into the seller nurture ("warp"). Submitting is the SMS opt-in —
// the consent disclosure sits above the button.
export default function HomeValueForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setState("submitting");
    setError("");

    const form = new FormData(formEl);
    try {
      const res = await fetch(
        "https://portal.thegridre.com/api/public/contact/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site: "thegridre.com",
            site_key: "150d6505d2c0416481881cf6e24f6937",
            form_type: "home_value",
            name: form.get("name"),
            email: form.get("email"),
            phone: form.get("phone"),
            property_address: form.get("property_address"),
            message: form.get("message"),
            sms_consent: true,
          }),
        }
      );
      if (!res.ok) throw new Error((await res.text()) || "Request failed.");
      setState("success");
      formEl.reset();
    } catch (err: any) {
      setState("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-black/10 p-6 text-sm text-black/75">
        Thanks — we&apos;ll prepare a valuation for your home and follow up
        shortly with what it&apos;s worth in today&apos;s market.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">property address</label>
        <input
          name="property_address"
          required
          placeholder="123 Main St, Norman, OK"
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">name</label>
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">phone</label>
          <input
            name="phone"
            required
            placeholder="405-555-1234"
            className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">
          anything we should know? (optional)
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Timeframe, recent updates, why you're curious…"
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      <p className="text-xs text-black/50">
        By submitting, you agree that GRID Real Estate LLC may contact you by
        phone, email, and text message about your home valuation. Message &amp;
        data rates may apply; message frequency varies. Reply STOP to opt out of
        texts at any time.
      </p>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {state === "submitting" ? "sending..." : "get my home value"}
      </button>

      {state === "error" && (
        <div className="text-sm text-red-600">Error: {error}</div>
      )}
    </form>
  );
}
