"use client";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <img src="/brand/grid_logo.png" alt="GRID" className="h-8 w-auto" />
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>

      <div className="text-sm text-gray-500">
        Effective Date: March 4, 2026
      </div>

      <Section title="1. Information We Collect">
        <p>
          We may collect information you voluntarily provide, including your name,
          contact details, property details, and financial inputs entered into our
          calculators.
        </p>
        <p>
          We may also collect limited technical information such as IP address,
          browser type, device information, and usage patterns.
        </p>
      </Section>

      <Section title="2. How We Use Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide and improve our tools and services</li>
          <li>Generate calculations and reports</li>
          <li>Respond to inquiries</li>
          <li>Monitor performance and usage</li>
          <li>Maintain security</li>
        </ul>
      </Section>

      <Section title="3. Calculator & Financial Data">
        <p>
          Information entered into GRID tools is used solely to generate calculations.
          We do not sell or share this data. Some data may be stored temporarily to
          improve functionality.
        </p>
        <p>
          All outputs are estimates and should be independently verified.
        </p>
      </Section>

      <Section title="4. Sharing of Information">
        <p>We do not sell your personal information.</p>
        <p>
          We may share information with service providers, if required by law, or to
          protect our platform and users.
        </p>
      </Section>

      <Section title="5. Cookies & Tracking">
        <p>
          We may use cookies or similar technologies to improve performance and user
          experience. You can disable cookies in your browser settings.
        </p>
      </Section>

      <Section title="6. Data Security">
        <p>
          We take reasonable measures to protect your information, but no system is
          completely secure.
        </p>
      </Section>

      <Section title="7. Third-Party Services">
        <p>
          We may use third-party tools such as analytics providers. These services
          operate under their own privacy policies.
        </p>
      </Section>

      <Section title="8. Your Rights">
        <p>
          You may request access, correction, or deletion of your data by contacting us.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this policy from time to time. Updates will be posted on this
          page.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>GRID Real Estate LLC</p>
        <p>1263 S Eastern Ave Ste B</p>
        <p>Moore, OK 73160</p>
        <p>info@thegridre.com</p>
      </Section>

      <div className="border-t pt-4 text-xs text-gray-500">
        Disclaimer: GRID provides tools for estimation purposes only. This is not
        financial, legal, or investment advice.
      </div>
    </div>
  );
}

/* ---------- reusable section ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold uppercase text-gray-600">
        {title}
      </h2>
      <div className="text-sm text-gray-700 space-y-2">{children}</div>
    </div>
  );
}