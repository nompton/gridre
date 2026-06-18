import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Contact — GRID Real Estate",
  description: "Get in touch with GRID Real Estate. Property management, association management, investor services, and listings in Norman, Oklahoma.",
};

export default function ContactPage() {
  return (
    <div>
      <Section kicker="Contact" title="Let's talk">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm text-black/75 mb-6">
              Whether you're interested in property management, association management, investing in Norman, or buying and selling, send a message and we'll follow up promptly.
            </p>
            <ContactForm />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/10 p-6">
              <div className="text-sm font-semibold tracking-tight">Contact details</div>
              <div className="mt-5 text-sm">
                <div className="text-black/60">phone</div>
                <a className="font-medium underline underline-offset-4 hover:text-black/70 transition" href="tel:4053101221">(405) 310-1221</a>
              </div>
              <div className="mt-4 text-sm">
                <div className="text-black/60">email</div>
                <a className="font-medium underline underline-offset-4 hover:text-black/70 transition" href="mailto:info@thegridre.com">info@thegridre.com</a>
              </div>
              <div className="mt-4 text-sm">
                <div className="text-black/60">address</div>
                <div className="mt-1">117 E Daws St</div>
                <div>Norman, OK 73069</div>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 p-6">
              <div className="text-sm font-semibold tracking-tight">What we help with</div>
              <ul className="mt-4 space-y-2 text-sm text-black/75">
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  Property management proposals
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  HOA and association management inquiries
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  Investment acquisition and portfolio strategy
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  Listing and selling properties in Norman
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  Buying, including investor acquisitions
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  General questions about the Norman market
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
