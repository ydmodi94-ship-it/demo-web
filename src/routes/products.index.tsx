import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { z } from "zod";
import { allApplications, allGrades, categories, filterProducts, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageHeader";
import { btn } from "@/components/site/styles";
import { seo } from "@/lib/seo";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  application: z.string().optional(),
  grade: z.string().optional(),
  sort: z.enum(["az", "za"]).optional(),
});

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => seo("Product Catalogue", "Filter the demo chemical catalogue by category, application and grade, or search by name, CAS number and catalogue code."),
  component: Catalogue,
});

function Catalogue() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const set = (patch: Partial<typeof s>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  const list = filterProducts(products, s);
  const active = !!(s.q || s.category || s.application || s.grade);

  const Select = ({ label, k, options }: { label: string; k: "category" | "application" | "grade"; options: { v: string; l: string }[] }) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      <select className="field-input" value={s[k] ?? ""} onChange={(e) => set({ [k]: e.target.value || undefined })}>
        <option value="">All</option>
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </label>
  );

  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Product catalogue">
        Search and filter illustrative sample products. Replace with the client's verified product data before launch.
      </PageHeader>
      <div className="container-page grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Filters">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">Search</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input className="field-input pl-9" placeholder="Name, CAS or code" value={s.q ?? ""} onChange={(e) => set({ q: e.target.value || undefined })} />
            </div>
          </label>
          <Select label="Category" k="category" options={categories.map((c) => ({ v: c.slug, l: c.name }))} />
          <Select label="Application" k="application" options={allApplications.map((a) => ({ v: a, l: a }))} />
          {allGrades.length > 0 && <Select label="Grade" k="grade" options={allGrades.map((g) => ({ v: g, l: g }))} />}
          {active && (
            <button onClick={() => navigate({ search: {}, replace: true })} className={`${btn.outline} w-full`}>
              <X className="h-4 w-4" /> Reset filters
            </button>
          )}
        </aside>
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing <strong className="text-navy">{list.length}</strong> of {products.length} products
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort</span>
              <select className="field-input w-auto py-2" value={s.sort ?? "az"} onChange={(e) => set({ sort: e.target.value as "az" | "za" })}>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
            </label>
          </div>
          {list.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-10 text-center">
              <h2 className="text-lg font-semibold">No products match these filters</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try a broader search, reset the filters, or send us your requirement directly.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button onClick={() => navigate({ search: {}, replace: true })} className={btn.outline}>Reset filters</button>
                <Link to="/quote" search={{ product: undefined }} className={btn.primary}>Send an enquiry</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
