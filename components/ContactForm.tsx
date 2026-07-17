"use client";

import { useMemo, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  // Webhook endpoint from environment variable
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
    []
  );

  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ Save the form element immediately (fixes reset bug)
    const formEl = e.currentTarget;

    setState("submitting");
    setError("");

    // Collect form data
    const form = new FormData(formEl);

    // Convert to plain object
    const payload = Object.fromEntries(form.entries());

    try {
      // Primary destination: the GRID backend (Messages inbox + CRM lead).
      const res = await fetch(
        "https://portal.thegridre.com/api/public/contact/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site: "thegridre.com",
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            interest: payload.inquiryType,
            message: payload.message,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed.");
      }

      // Also fire the legacy webhook if one is still configured, so anything
      // that relied on it keeps working. Best-effort — never blocks success.
      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }

      // ✅ Success
      setState("success");

      // ✅ Reset safely
      formEl.reset();
    } catch (err: any) {
      setState("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* Name */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">name</label>
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      {/* Email */}
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

      {/* Phone */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">phone (optional)</label>
        <input
          name="phone"
          placeholder="405-555-1234"
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      {/* Inquiry Type */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">what can we help with?</label>
        <select
          name="inquiryType"
          required
          defaultValue="Property Management"
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        >
          <option>Property Management</option>
          <option>HOA Management</option>
          <option>Rental Owner Inquiry</option>
          <option>Board Proposal Request</option>
          <option>Investor Services</option>
          <option>Buying or Selling</option>
          <option>General Question</option>
        </select>
      </div>

      {/* Message */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">message</label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us a little about what you need..."
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {state === "submitting" ? "sending..." : "send"}
      </button>

      {/* Success */}
      {state === "success" && (
        <div className="text-sm text-black/70">
          Thanks. We got it and will follow up shortly.
        </div>
      )}

      {/* Error */}
      {state === "error" && (
        <div className="text-sm text-red-600">Error: {error}</div>
      )}
    </form>
  );
}