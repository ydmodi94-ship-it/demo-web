import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Notice } from "@/components/site/PageHeader";
import { btn } from "@/components/site/styles";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About", "About the ChemCore Industries demonstration website — a fictional brand built to showcase a chemical B2B web experience."),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="About this demonstration">ChemCore Industries is fictional. This page shows where a real company story would go.</PageHeader>
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
        <div className="max-w-2xl space-y-5 text-muted-foreground">
          <p>
            This website is a reusable template for specialty-chemical manufacturers and traders. It demonstrates a clear product catalogue,
            CAS-number search, document requests and structured bulk enquiries.
          </p>
          <p>
            For a live client site, this page would present the company's verified history, leadership, facility locations and values —
            supplied by the client and reviewed before publishing.
          </p>
          <Notice>No history, founding year, team size, customers or certifications are claimed for ChemCore Industries.</Notice>
        </div>
        <div className="space-y-3 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-semibold">Explore the demo</h2>
          <Link to="/products" className={`${btn.outline} w-full`}>Product catalogue</Link>
          <Link to="/manufacturing" className={`${btn.outline} w-full`}>Manufacturing</Link>
          <Link to="/contact" className={`${btn.primary} w-full`}>Contact</Link>
        </div>
      </div>
    </>
  );
}
