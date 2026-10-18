import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Beaker, FileText, LayoutGrid, Search, Send } from "lucide-react";
import hero from "@/assets/hero-plant.jpg";
import manufacturing from "@/assets/manufacturing.jpg";
import lab from "@/assets/lab.jpg";
import { categories, getProduct, products } from "@/data/products";
import { useSiteConfig } from "@/components/site/config-context";
import { SearchBar } from "@/components/site/SearchBar";
import { ProductCard } from "@/components/site/ProductCard";
import { btn } from "@/components/site/styles";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Specialty Chemicals Catalogue", "Search specialty, pharmaceutical and dye intermediates by name, CAS number or catalogue code and send bulk enquiries. Demo site."),
  component: Home,
});

const benefits = [
  { icon: LayoutGrid, title: "Organized catalogue", text: "Products grouped by category, application and grade." },
  { icon: Search, title: "Easy identification", text: "Search by chemical name, CAS number or catalogue code." },
  { icon: FileText, title: "Document requests", text: "Request TDS, SDS or CoA directly from a product page." },
  { icon: Send, title: "Direct bulk enquiries", text: "Structured RFQs capture quantity, grade and destination." },
];

function Home() {
  const { config } = useSiteConfig();
  const featured = config.featuredSlugs.map(getProduct).filter(Boolean) as typeof products;
  const orderedCats = config.categoryOrder.map((s) => categories.find((c) => c.slug === s)!).filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="Stainless-steel reactors and pipework at a chemical plant at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-page relative py-20 md:py-32">
          <p className="eyebrow mb-4">Specialty chemicals · B2B catalogue</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] text-navy-foreground md:text-6xl">{config.hero.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-navy-foreground/80">{config.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className={btn.primary}>Explore Products <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/quote" className={btn.ghostLight}>Request a Quote</Link>
          </div>
          <div className="mt-12 max-w-2xl"><SearchBar /></div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Product categories</p>
            <h2 className="text-3xl font-bold">Browse by chemistry</h2>
          </div>
          <Link to="/categories" className={btn.small}>All categories <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {orderedCats.map((c, i) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-teal hover:shadow-lift">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-6 font-semibold group-hover:text-teal">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <p className="mt-4 font-mono text-xs text-teal">{products.filter((p) => p.category === c.slug).length} sample products</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Featured products</p>
              <h2 className="text-3xl font-bold">Sample catalogue entries</h2>
              <p className="mt-2 text-sm text-muted-foreground">Illustrative demo content — not real product listings.</p>
            </div>
            <Link to="/products" className={btn.small}>Full catalogue <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="eyebrow mb-2">Built for buyers</p>
        <h2 className="mb-10 max-w-xl text-3xl font-bold">Product discovery designed for procurement teams</h2>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card p-6">
              <b.icon className="h-6 w-6 text-teal" aria-hidden />
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page grid items-center gap-10 pb-20 md:grid-cols-2">
        <img src={lab} alt="Quality-control laboratory bench with sample vials and an HPLC instrument" loading="lazy" width={1600} height={1072} className="aspect-[4/3] w-full rounded-lg object-cover" />
        <div>
          <p className="eyebrow mb-2">Quality & documentation</p>
          <h2 className="text-3xl font-bold">Technical documents, available on request</h2>
          <p className="mt-4 text-muted-foreground">
            Buyers can request Technical Data Sheets, Safety Data Sheets and batch-specific Certificates of Analysis from any product page.
            Documents are shared only after the manufacturer verifies the request — no documents are generated or published in this demo.
          </p>
          <Link to="/quality" className={`${btn.outline} mt-6`}>Quality & documentation</Link>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="container-page grid items-center gap-10 py-20 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="eyebrow mb-2">Manufacturing</p>
            <h2 className="text-3xl font-bold text-navy-foreground">Showcase verified production capabilities</h2>
            <p className="mt-4 text-navy-foreground/75">
              This section presents reactor capacity, process types and facility details. In the demo it is intentionally neutral — each
              client's capabilities must be replaced with verified information before launch.
            </p>
            <Link to="/manufacturing" className={`${btn.ghostLight} mt-6`}>Manufacturing capabilities</Link>
          </div>
          <img src={manufacturing} alt="Glass-lined reactors and control panels in a production hall" loading="lazy" width={1600} height={1072} className="order-1 aspect-[4/3] w-full rounded-lg object-cover md:order-2" />
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid-lines flex flex-col items-start justify-between gap-6 rounded-xl bg-navy-soft p-10 text-navy-foreground md:flex-row md:items-center">
          <div>
            <Beaker className="mb-3 h-8 w-8 text-teal" aria-hidden />
            <h2 className="text-2xl font-bold text-navy-foreground md:text-3xl">Have a bulk requirement?</h2>
            <p className="mt-2 text-navy-foreground/75">Share product, quantity and destination — get a structured enquiry in minutes.</p>
          </div>
          <Link to="/quote" className={btn.primary}>Request a Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
