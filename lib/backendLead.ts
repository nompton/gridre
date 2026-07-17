// Funnels a website lead into the GRID backend: portal.thegridre.com's shared
// public contact endpoint, which drops the inquiry into the Messages inbox as
// a repliable thread and logs the sender as a CRM lead. The endpoint is
// CORS-enabled and unauthenticated, so this is a plain cross-origin POST.
//
// Best-effort by design: it never throws. Landing pages call this alongside
// their existing marketing-automation webhook and Meta Pixel, so a hiccup
// reaching the backend must not block the visitor's submission or the other
// integrations firing.
export async function sendLeadToBackend(payload: {
  site: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}): Promise<void> {
  try {
    await fetch("https://portal.thegridre.com/api/public/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Swallow — the backend is a secondary destination here.
  }
}
