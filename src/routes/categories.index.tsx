import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/data/products";
import { PageHeader } from "@/components/site/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/categories/")({
  head: () => seo("Product Categories", "Organic, specialty, pharmaceutical, dye and industrial chemical categories in the ChemCore demo catalogue."),
  component: Categories,
});

function Categories() {
  return (
    <>
      <PageHeader eyebrow="Categories" title="Product categories">Five category groups, each linking to its filtered catalogue.</PageHeader>
      <div className="container-page grid gap-5 py-14 md:grid-cols-2">
        {categories.map((c) => (
          <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group flex items-center justify-between gap-6 rounded-lg border border-border p-6 hover:border-teal hover:shadow-lift">
            <div>
              <h2 className="text-xl font-semibold group-hover:text-teal">{c.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <p className="mt-3 font-mono text-xs text-teal">{products.filter((p) => p.category === c.slug).length} sample products</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-teal" />
          </Link>
        ))}
      </div>
    </>
  );
}
