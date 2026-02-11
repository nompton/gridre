"use client";

import { useMemo, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
    []
  );
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      if (!endpoint) {
        throw new Error("Missing NEXT_PUBLIC_CONTACT_ENDPOINT.");
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed.");
      }

      setState("success");
      e.currentTarget.reset();
    } catch (err: any) {
      setState("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">name</label>
        <input
          name="name"
          required
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">email</label>
        <input
          name="email"
          type="email"
          required
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        send
      </button>

      {state === "success" && (
        <div className="text-sm text-black/70">
          Thanks. We got it and will follow up.
        </div>
      )}
      {state === "error" && (
        <div className="text-sm text-red-600">Error: {error}</div>
      )}
    </form>
  );
}
