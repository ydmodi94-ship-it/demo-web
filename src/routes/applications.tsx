import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { allApplications, products } from "@/data/products";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/applications")({
  head: () => seo("Applications", "Find demo chemical products by end-use application such as dye manufacture, pharmaceutical synthesis and coatings."),
  component: Applications,
});

function Applications() {
  return (
    <>
      <PageHeader eyebrow="Applications" title="Find products by application">
        Application tags are illustrative and must be replaced with each client's verified use cases.
      </PageHeader>
      <div className="container-page grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {allApplications.map((a) => (
          <Link key={a} to="/products" search={{ application: a }} className="group flex items-center justify-between rounded-lg border border-border p-5 hover:border-teal hover:shadow-lift">
            <div>
              <h2 className="font-semibold group-hover:text-teal">{a}</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{products.filter((p) => p.applications?.includes(a)).length} sample products</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-teal" />
          </Link>
        ))}
      </div>
    </>
  );
}
