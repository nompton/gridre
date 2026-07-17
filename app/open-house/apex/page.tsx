"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Script from "next/script"
import { sendLeadToBackend } from "@/lib/backendLead"

const photos = Array.from({ length: 35 }, (_, i) => `/open-house/apex/${i + 1}.jpg`)

export default function OpenHouseApexPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedImageIndex === null) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedImageIndex(null)
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev === null ? 0 : prev === photos.length - 1 ? 0 : prev + 1
        )
      }
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev === null ? 0 : prev === 0 ? photos.length - 1 : prev - 1
        )
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedImageIndex])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Funnel the lead into the GRID backend, independent of the marketing
    // webhook below so it lands even if that automation is unavailable.
    sendLeadToBackend({
      site: "3844 Apex Court Open House",
      name: String(data.name || ""),
      email: String(data.email || ""),
      phone: String(data.phone || ""),
      interest: "Open house — 3844 Apex Court",
      message: [
        data.message,
        data.workingWithAgent && `Working with an agent: ${data.workingWithAgent}`,
        data.priceOpinion && `Price opinion: ${data.priceOpinion}`,
        data.favoriteFeature && `Favorite feature: ${data.favoriteFeature}`,
        data.leastFavorite && `Least favorite: ${data.leastFavorite}`,
      ]
        .filter(Boolean)
        .join("\n"),
    })

    try {
      const res = await fetch("https://automation.thegridre.com/webhook/open-house-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "3844 Apex Court Open House",
          page: "/open-house/apex",
          type: "combined",
          timestamp: new Date().toISOString(),
          ...data,
        }),
      })

      if (!res.ok) {
        throw new Error(`Webhook failed with status ${res.status}`)
      }

      if (typeof window !== "undefined" && (window as any).fbq) {
        ;(window as any).fbq("track", "Lead")
        ;(window as any).fbq("track", "SubmitApplication", {
          content_name: "3844 Apex Court Open House Form",
        })
      }

      form.reset()
      setFormSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was a problem submitting the form. Please try again.")
    }
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '819073804558751');
          fbq('track', 'PageView');
          fbq('track', 'ViewContent', {
            content_name: '3844 Apex Court',
            content_category: 'Open House'
          });
        `}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=819073804558751&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="bg-black text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/open-house/apex/1.jpg"
              alt="3844 Apex Court hero"
              fill
              priority
              className="object-cover opacity-35"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-28">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">
              GRID Open House
            </p>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
              3844 Apex Court
            </h1>
            <p className="mt-3 text-lg text-white/80 md:text-xl">Norman, OK 73072</p>
            <p className="mt-4 text-sm text-white/60">
              Visiting the open house? Leave your feedback below or request a private showing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                $293,500
              </div>
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                4 Bedrooms
              </div>
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                2 Bathrooms
              </div>
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                2,069 SF
              </div>
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                Geothermal + Solar
              </div>
              <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                $245/year HOA
              </div>
            </div>

            <div className="mt-8 md:hidden">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/60">
                <span>Swipe Through Photos</span>
                <span>1 of {photos.length}+</span>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/50 to-transparent" />
                <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                  <span>{"←"}</span>
                  <span>Swipe Photos</span>
                  <span>{"→"}</span>
                </div>
                <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth">
                  {photos.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className="relative h-64 min-w-[88%] snap-center first:ml-4 last:mr-4"
                    >
                      <Image
                        src={src}
                        alt={`3844 Apex Court mobile photo ${index + 1}`}
                        fill
                        className="rounded-2xl object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
              Beautifully maintained townhouse in Summitt with four large bedrooms,
              soaring ceilings, newer hand-scraped wood flooring, granite countertops,
              geothermal heating and cooling, and solar panels for lower utility costs.
              This home offers an efficient, functional layout in a convenient Norman
              location close to shopping, dining, and schools.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-14">
          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href="/open-house/apex/disclosure.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white hover:text-black"
            >
              View Seller Disclosure
            </a>
            <a
              href="/open-house/apex/measurement.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white hover:text-black"
            >
              View Measurements
            </a>
            <a
              href="/open-house/apex/ong_bills.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:bg-white hover:text-black"
            >
              View Average ONG Bills
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Price</p>
              <p className="mt-3 text-3xl font-bold">$293,500</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Layout</p>
              <p className="mt-3 text-3xl font-bold">4 Bed / 2 Bath</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Size</p>
              <p className="mt-3 text-3xl font-bold">2,069 SF</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">HOA</p>
              <p className="mt-3 text-3xl font-bold">$245/yr</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-6 md:px-8 md:pb-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-wide md:text-3xl">
                Property Highlights
              </h2>
              <div className="mt-6 space-y-5 text-white/80">
                <p>
                  Looking for an energy-efficient home with low utility bills? This spacious
                  property combines comfort and efficiency with geothermal heating and cooling
                  and solar panels already in place.
                </p>
                <p>
                  The inviting living room features tall ceilings, abundant natural light, a
                  gas log fireplace, and newer hand-scraped wood flooring. The kitchen offers
                  granite countertops and generous workspace for daily living or entertaining.
                </p>
                <p>
                  The split floorplan includes a comfortable primary suite with a walk-in closet
                  and attached full bath. Additional features include a study, covered porch,
                  open patio, attached two-car garage, and cul-de-sac location.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="text-xl font-bold uppercase tracking-wide">Quick Facts</h3>
              <dl className="mt-6 space-y-4 text-sm text-white/80">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Subdivision</dt>
                  <dd>Summitt</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Year Built</dt>
                  <dd>1983</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Garage</dt>
                  <dd>2 Car Attached</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Lot Size</dt>
                  <dd>0.079 Acres</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>School District</dt>
                  <dd>Norman</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Elementary</dt>
                  <dd>Truman ES / Truman Primary</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Middle</dt>
                  <dd>Alcott MS</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>High</dt>
                  <dd>Norman HS</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="mx-auto hidden max-w-6xl px-4 py-12 md:block md:px-8 md:py-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Gallery</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide md:text-3xl">
              Photos
            </h2>
          </div>

          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
            {photos.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className="group relative h-[420px] min-w-[78%] overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:min-w-[48%]"
              >
                <Image
                  src={src}
                  alt={`3844 Apex Court photo ${index + 1}`}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-14">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Open House Form</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide md:text-3xl">
              Share Your Thoughts and Request Info
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Leave your contact information if you want a follow-up, ask a question, or tell us what you think of the home.
            </p>

            {formSubmitted ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
                Thanks. Your information has been sent.
              </div>
            ) : (
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/65 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35"
                />
                <input
                  name="phone"
                  autoComplete="tel"
                  placeholder="Phone"
                  className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/65 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35"
                />
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/65 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35 md:col-span-2"
                />
                <select
                  name="workingWithAgent"
                  className="w-full appearance-none rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35"
                  defaultValue=""
                >
                  <option value="">Are you working with an agent?</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Not sure">Not sure</option>
                </select>
                
                <select
                  name="priceOpinion"
                  className="w-full appearance-none rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35"
                  defaultValue=""
                >
                  <option value="">How does the price feel?</option>
                  <option value="Too high">Too high</option>
                  <option value="About right">About right</option>
                  <option value="Good deal">Good deal</option>
                </select>
                <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
                <input
                  name="favoriteFeature"
                  placeholder="Favorite feature"
                  className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/65 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35"
                />
                <input
                  name="leastFavorite"
                  placeholder="Least favorite feature"
                  className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/65 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35"
                />
              </div>
                <textarea
                  name="message"
                  placeholder="Questions or comments"
                  rows={5}
                  className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/65 outline-none ring-1 ring-inset ring-white/10 backdrop-blur-sm focus:border-white/60 focus:bg-white/15 focus:ring-white/35 md:col-span-2"
                />
                <button
                  type="submit"
                  className="w-full rounded-full border border-white bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white md:col-span-2"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-10 md:px-8">
          <div className="mx-auto max-w-6xl text-sm text-white/60">
            <p>Listing courtesy of Lara Elliott, McGraw Davisson Stewart LLC.</p>
            <p className="mt-2">
              Information deemed reliable but not guaranteed. Buyer to verify all information.
            </p>
          </div>
        </section>

        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95"
            onTouchStart={(e) => {
              const touch = e.changedTouches[0]
              ;(e.currentTarget as HTMLDivElement).dataset.touchStartX = String(touch.clientX)
            }}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0]
              const startX = Number((e.currentTarget as HTMLDivElement).dataset.touchStartX || 0)
              const deltaX = touch.clientX - startX
              if (deltaX > 50) {
                setSelectedImageIndex((prev) =>
                  prev === null ? 0 : prev === 0 ? photos.length - 1 : prev - 1
                )
              } else if (deltaX < -50) {
                setSelectedImageIndex((prev) =>
                  prev === null ? 0 : prev === photos.length - 1 ? 0 : prev + 1
                )
              }
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white"
            >
              Close
            </button>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === null ? 0 : prev === 0 ? photos.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-3 text-2xl text-white md:left-6"
            >
              {"←"}
            </button>

            <button
              type="button"
              aria-label="Next photo"
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === null ? 0 : prev === photos.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-3 text-2xl text-white md:right-6"
            >
              {"→"}
            </button>

            <div className="absolute inset-x-0 top-4 z-10 text-center text-sm text-white/80">
              Photo {selectedImageIndex + 1} of {photos.length}
            </div>

            <div className="relative mx-auto h-full w-full max-w-6xl px-14 py-16 md:px-24">
              <Image
                src={photos[selectedImageIndex]}
                alt={`3844 Apex Court photo ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </main>
    </>
  )
}
