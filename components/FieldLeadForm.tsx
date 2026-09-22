"use client";

import { useState } from "react";

export default function FieldLeadForm() {
  // Route canvassed rental signs into the GRID CRM through the same battle-tested
  // public lead intake as every other GRID form (contact / home-value / open
  // house) — attributed by GRID's per-site signing key. Replaces the retired n8n
  // "field-log" webhook (automation.thegridre.com is dead), which was silently
  // dropping every logged sign.
  const LEAD_ENDPOINT = "https://portal.thegridre.com/api/public/contact/submit";
  const GRID_SITE_KEY = "150d6505d2c0416481881cf6e24f6937";

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [status, setStatus] = useState<"idle" | "sending" | "saved" | "error">(
    "idle"
  );

  function captureGPS() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formEl = e.currentTarget;
    const p = Object.fromEntries(
      new FormData(formEl).entries()
    ) as Record<string, string>;

    const address = (p.address || "").trim();
    const city = (p.city || "").trim();

    // Fold the canvass details the intake has no dedicated column for into the
    // lead message so nothing is lost. The sign phone is the landlord/PM contact.
    const message = [
      p.propertyType ? `Type: ${p.propertyType}` : "",
      p.condition ? `Condition: ${p.condition}` : "",
      p.signPhone2 ? `Second sign phone: ${p.signPhone2}` : "",
      p.notes ? `Notes: ${p.notes}` : "",
      coords
        ? `GPS: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)} · https://maps.google.com/?q=${coords.lat},${coords.lng}`
        : "",
      "\nLogged from the GRID field-canvass tool.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "GRID field canvass",
          site_key: GRID_SITE_KEY,
          // The intake requires a name; a canvassed sign has none, so label it by
          // its address. `interest` tags it a landlord-lead. No email / no
          // sms_consent, so the sign's number is never auto-contacted.
          name: `Rental sign${address ? ` — ${address}` : ""}`,
          phone: (p.signPhone || "").trim(),
          interest: "Rental Owner",
          property_address: [address, city].filter(Boolean).join(", "),
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("saved");
      formEl.reset();
      setCoords(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <input
        name="address"
        placeholder="Address"
        required
        className="border p-3 rounded-xl"
      />

      <input
        name="city"
        placeholder="City"
        className="border p-3 rounded-xl"
      />

      <input
        name="signPhone"
        placeholder="Sign Phone"
        className="border p-3 rounded-xl"
      />

      <input
        name="signPhone2"
        placeholder="Sign Phone 2"
        className="border p-3 rounded-xl"
      />

      <select name="propertyType" className="border p-3 rounded-xl">
        <option>House</option>
          <option>Duplex</option>
          <option>Triple</option>
          <option>4+ Units</option>
          <option>Condo</option>
          <option>Townhouse</option>
      </select>

      <select name="condition" className="border p-3 rounded-xl">
        <option>Good</option>
        <option>Average</option>
        <option>Rough</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes"
        className="border p-3 rounded-xl"
      />

      {!coords ? (
        <button
          type="button"
          onClick={captureGPS}
          className="bg-black text-white p-3 rounded-xl"
        >
          📍 Capture GPS
        </button>
      ) : (
        <div className="text-sm text-green-700">
          GPS Saved ✅ {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
        </div>
      )}

      <button className="bg-black text-white p-3 rounded-xl">
        {status === "sending" ? "Saving..." : "Save Rental Lead"}
      </button>

      {status === "saved" && (
        <p className="text-green-700 text-sm">Saved to CRM ✅</p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Couldn&apos;t save — check the address &amp; sign phone and try again.
        </p>
      )}
    </form>
  );
}