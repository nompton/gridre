"use client";

import { useState } from "react";

export default function FieldLeadForm() {
  const endpoint = "https://automation.thegridre.com/webhook/field-log";

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
    const form = new FormData(formEl);

    if (coords) {
      form.append("lat", coords.lat.toString());
      form.append("lng", coords.lng.toString());
    }

    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Webhook failed");
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
        <option>Fourplex</option>
        <option>Apartment</option>
        <option>Condo</option>
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
          Something went wrong. Check webhook.
        </p>
      )}
    </form>
  );
}