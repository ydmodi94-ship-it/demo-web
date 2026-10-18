import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, FileText, MessageCircle } from "lucide-react";
import { getCategory, getProduct, products } from "@/data/products";
import { useSiteConfig } from "@/components/site/config-context";
import { ProductCard } from "@/components/site/ProductCard";
import { DocRequestForm, SampleRequestForm } from "@/components/site/forms";
import { btn } from "@/components/site/styles";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} (${p.catalogueCode}) | ChemCore Industries (Demo)` : "Product unavailable | ChemCore Industries (Demo)";
    const desc = p?.description ?? "This product could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { config } = useSiteConfig();
  const cat = getCategory(p.category);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  const wa = config.features.whatsappEnquiries && config.contact.whatsappNumber;

  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-teal">Home</Link><ChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-teal">Products</Link><ChevronRight className="h-4 w-4" />
        {cat && (<><Link to="/categories/$slug" params={{ slug: cat.slug }} className="hover:text-teal">{cat.name}</Link><ChevronRight className="h-4 w-4" /></>)}
        <span aria-current="page" className="text-navy">{p.name}</span>
      </nav>

      <div role="note" className="mb-8 flex gap-3 rounded-lg border border-warning/30 bg-warning-soft p-4 text-sm">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning" aria-hidden />
        <p><strong>Demo product.</strong> This entry and its specifications are illustrative and must not be used for procurement, manufacturing, handling or safety decisions.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow mb-2">{cat?.name}</p>
          <h1 className="text-3xl font-bold md:text-4xl">{p.name}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{p.description}</p>

          <dl className="mt-8 grid overflow-hidden rounded-lg border border-border sm:grid-cols-3">
            {[["Catalogue code", p.catalogueCode], ["CAS number", p.casNumber], ["Grade", p.grade]].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="border-b border-border p-4 sm:border-b-0 sm:border-r last:border-0">
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-mono font-medium text-navy">{v}</dd>
              </div>
            ))}
          </dl>

          {p.specification?.length ? (
            <section className="mt-10">
              <h2 className="mb-3 text-xl font-semibold">Specification</h2>
              <table className="w-full overflow-hidden rounded-lg border border-border text-sm">
                <tbody>
                  {p.specification.map((s) => (
                    <tr key={s.label} className="border-b border-border last:border-0">
                      <th scope="row" className="w-1/3 bg-muted p-3 text-left font-medium text-navy">{s.label}</th>
                      <td className="p-3">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}

          {p.applications?.length ? (
            <section className="mt-10">
              <h2 className="mb-3 text-xl font-semibold">Applications</h2>
              <div className="flex flex-wrap gap-2">
                {p.applications.map((a) => (
                  <Link key={a} to="/products" search={{ application: a }} className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground hover:bg-teal hover:text-navy-foreground">{a}</Link>
                ))}
              </div>
            </section>
          ) : null}

          {p.packaging?.length ? (
            <section className="mt-10">
              <h2 className="mb-3 text-xl font-semibold">Packaging</h2>
              <ul className="list-inside list-disc text-sm text-muted-foreground">{p.packaging.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          ) : null}

          {config.features.technicalDocumentRequests && (
            <section id="documents" className="mt-12 scroll-mt-28 rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold">Request documents</h2>
              <p className="mb-5 mt-1 text-sm text-muted-foreground">No public documents are published for demo products. Request them below.</p>
              <DocRequestForm productName={p.name} allowCoa={config.features.coaRequest} />
            </section>
          )}

          {config.features.dyeSampleRequests && p.category === "dye-intermediates" && (
            <section id="sample" className="mt-8 rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold">Request a sample</h2>
              <p className="mb-5 mt-1 text-sm text-muted-foreground">Sample availability is subject to manufacturer confirmation.</p>
              <SampleRequestForm productName={p.name} />
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">Enquire about this product</h2>
            <p className="mt-1 text-sm text-muted-foreground">Share quantity, grade and destination for a quotation.</p>
            <div className="mt-5 flex flex-col gap-3">
              {p.enquiryEnabled && <Link to="/quote" search={{ product: p.slug }} className={btn.primary}>Request Quote</Link>}
              {config.features.technicalDocumentRequests && (
                <a href="#documents" className={btn.outline}><FileText className="h-4 w-4" /> Request Documents</a>
              )}
              {wa && (
                <a
                  href={`https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(`Enquiry: ${p.name} (${p.catalogueCode})`)}`}
                  target="_blank" rel="noopener noreferrer" className={btn.outline}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp enquiry
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related products</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
        </section>
      )}
    </div>
  );
}
