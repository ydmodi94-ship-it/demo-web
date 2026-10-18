import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getProduct } from "@/data/products";
import { PageHeader } from "@/components/site/PageHeader";
import { RfqForm } from "@/components/site/forms";
import { useSiteConfig } from "@/components/site/config-context";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  validateSearch: z.object({ product: z.string().optional() }),
  head: () => seo("Request a Quotation", "Submit a bulk chemical requirement with product, quantity, grade and destination. Demo form — nothing is transmitted."),
  component: Quote,
});

function Quote() {
  const { product } = Route.useSearch();
  const { config } = useSiteConfig();
  const p = product ? getProduct(product) : undefined;
  return (
    <>
      <PageHeader eyebrow="RFQ" title="Request a quotation">Tell us what you need. Required fields are marked with *.</PageHeader>
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_300px]">
        <div className="rounded-lg border border-border p-6 md:p-8">
          <RfqForm key={p?.slug ?? "none"} productName={p?.name} multi={config.features.multiProductRFQ} />
        </div>
        <aside className="space-y-4 text-sm text-muted-foreground">
          <div className="rounded-lg bg-surface p-5">
            <h2 className="mb-2 font-semibold">What happens next?</h2>
            <p>On a live site, your enquiry would be saved securely and routed to the sales team. In this demo nothing is sent or stored.</p>
          </div>
          <div className="rounded-lg bg-surface p-5">
            <h2 className="mb-2 font-semibold">Tip</h2>
            <p>Include the CAS number and grade to help identify the exact product.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
