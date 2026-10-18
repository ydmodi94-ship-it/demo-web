import { Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical } from "lucide-react";
import { getCategory, type Product } from "@/data/products";
import { btn } from "./styles";

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground">
          <FlaskConical className="h-5 w-5" aria-hidden />
        </span>
        <span className="rounded-full border border-warning/30 bg-warning-soft px-2 py-0.5 text-[11px] font-medium text-warning">Demo data</span>
      </div>
      <p className="eyebrow mb-1">{cat?.name}</p>
      <h3 className="text-base font-semibold leading-snug">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-teal">{product.name}</Link>
      </h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
        <dt>Code</dt><dd className="text-foreground">{product.catalogueCode}</dd>
        <dt>CAS</dt><dd className="text-foreground">{product.casNumber ?? "Not listed"}</dd>
        {product.grade && (<><dt>Grade</dt><dd className="text-foreground">{product.grade}</dd></>)}
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
        <Link to="/products/$slug" params={{ slug: product.slug }} className={btn.small}>
          View Product <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        {product.enquiryEnabled && (
          <Link to="/quote" search={{ product: product.slug }} className="ml-auto text-sm font-semibold text-navy hover:text-teal">
            Request Quote
          </Link>
        )}
      </div>
    </article>
  );
}
