import { createFileRoute, Link } from "@tanstack/react-router";
import lab from "@/assets/lab.jpg";
import { PageHeader, Notice } from "@/components/site/PageHeader";
import { DocRequestForm } from "@/components/site/forms";
import { useSiteConfig } from "@/components/site/config-context";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/quality")({
  head: () => seo("Quality & Documentation", "How buyers can request Technical Data Sheets, Safety Data Sheets and Certificates of Analysis. Demo site."),
  component: Quality,
});

const docs = [
  { t: "Technical Data Sheet", d: "Product properties and typical specification, as approved by the manufacturer." },
  { t: "Safety Data Sheet", d: "Hazard, handling and storage information — issued only by the manufacturer." },
  { t: "Certificate of Analysis", d: "Batch-specific test results, shared privately after the request is verified." },
];

function Quality() {
  const { config } = useSiteConfig();
  return (
    <>
      <PageHeader eyebrow="Quality" title="Quality & documentation">Technical documentation is available on request, never auto-generated.</PageHeader>
      <div className="container-page grid gap-12 py-14 lg:grid-cols-2">
        <div className="space-y-6">
          <img src={lab} alt="Laboratory bench with sample vials" loading="lazy" width={1600} height={1072} className="aspect-[16/10] w-full rounded-lg object-cover" />
          <div className="grid gap-4">
            {docs.filter((d) => config.features.coaRequest || d.t !== "Certificate of Analysis").map((d) => (
              <div key={d.t} className="rounded-lg border border-border p-5">
                <h2 className="font-semibold">{d.t}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.d}</p>
              </div>
            ))}
          </div>
          <Notice>
            This demo lists no certifications, test methods or quality claims. Add only certifications the client can verify. Browse the{" "}
            <Link to="/products" className="font-semibold text-teal">catalogue</Link> to request documents per product.
          </Notice>
        </div>
        {config.features.technicalDocumentRequests && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Request documentation</h2>
            <DocRequestForm allowCoa={config.features.coaRequest} />
          </div>
        )}
      </div>
    </>
  );
}
