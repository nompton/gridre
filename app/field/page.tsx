import FieldLeadForm from "@/components/FieldLeadForm";

export default function FieldPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Rental Lead Logger
      </h1>

      <FieldLeadForm />
    </div>
  );
}