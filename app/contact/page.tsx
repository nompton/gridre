import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <Section kicker="Contact" title="Let’s talk">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-sm text-black/75">
              Send a message and we&apos;ll follow up.
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">contact details</div>

            <div className="mt-5 text-sm">
              <div className="text-black/60">phone</div>
              <a className="underline underline-offset-4" href="tel:4053101221">
                (405) 310-1221
              </a>
            </div>

            <div className="mt-5 text-sm">
              <div className="text-black/60">email</div>
              <a className="underline underline-offset-4" href="mailto:info@thegridre.com">
                info@thegridre.com
              </a>
            </div>

            <div className="mt-5 text-sm">
              <div className="text-black/60">mailing address</div>
              <div>PO BOX 5063</div>
              <div>Norman, OK 73070</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
