import FieldLeadForm from "@/components/FieldLeadForm";
import ProformaEngine from "@/components/ProformaEngine";

export default function AgentToolsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">

      <div>
        <h1 className="text-2xl font-bold mb-2">
          GRID Agent Tools
        </h1>
        <p className="text-sm text-black/60">
          Field capture and underwriting tools for acquisition and management.
        </p>
      </div>

      {/* Rental Lead Logger */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">
          Rental Lead Logger
        </h2>
        <FieldLeadForm />
      </section>

      {/* Deal Underwriter */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">
          Deal Underwriter
        </h2>
        <ProformaEngine />
      </section>

    </div>
  );
}