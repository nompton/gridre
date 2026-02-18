"use client";

import { useState } from "react";

export default function FieldLeadForm() {
  const endpoint =
    "https://automation.thegridre.com/webhook/rental-lead";

  const [coords, setCoords] = useState<any>(null);
  const [status, setStatus] = useState("idle");

  function captureGPS() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }

  async function submit(e: any) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.target);

    if (coords) {
      form.append("lat", coords.lat);
      form.append("lng", coords.lng);
    }

    const payload = Object.fromEntries(form.entries());

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus("saved");
    e.target.reset();
    setCoords(null);
  }

  return (
    <form onSubmit={submit} className="grid gap-3">

      <input name="address" placeholder="Address" required className="border p-3 rounded-xl" />
      <input name="city" placeholder="City" className="border p-3 rounded-xl" />

      <input name="signPhone" placeholder="Sign Phone" className="border p-3 rounded-xl" />
      <input name="signPhone2" placeholder="Sign Phone 2" className="border p-3 rounded-xl" />

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

      <textarea name="notes" placeholder="Notes" className="border p-3 rounded-xl" />

      {!coords ? (
        <button type="button" onClick={captureGPS}
          className="bg-black text-white p-3 rounded-xl">
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
        <p className="text-green-700 text-sm">
          Saved to CRM ✅
        </p>
      )}
    </form>
  );
}