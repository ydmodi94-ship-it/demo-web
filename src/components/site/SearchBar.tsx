import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { filterProducts, products } from "@/data/products";
import { useSiteConfig } from "./config-context";

export function SearchBar() {
  const { config } = useSiteConfig();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const id = useId();
  const results = useMemo(() => (q.trim() ? filterProducts(products, { q }).slice(0, 5) : []), [q]);
  const placeholder = config.features.casSearch ? "Search by chemical name, CAS number or catalogue code" : "Search by chemical name or catalogue code";

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/products", search: { q: q.trim() || undefined } });
        }}
        className="flex items-center gap-2 rounded-lg border border-border bg-background p-2 shadow-lift"
      >
        <label htmlFor={id} className="sr-only">Search chemicals</label>
        <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          id={id}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          autoComplete="off"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        )}
        <button type="submit" className="min-h-11 rounded-md bg-teal px-5 text-sm font-semibold text-navy-foreground hover:bg-teal/90">Search</button>
      </form>
      {q.trim() && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-lg border border-border bg-popover p-2 shadow-lift">
          {results.length ? (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm hover:bg-muted">
                    <span className="font-medium text-navy">{p.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{p.catalogueCode}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No matches for “{q}”. Try a catalogue code like <button type="button" className="font-mono text-teal" onClick={() => setQ("CC-DI")}>CC-DI</button>, or{" "}
              <Link to="/quote" className="font-semibold text-teal">send an enquiry</Link>.
            </p>
          )}
        </div>
      )}
      {!q && (
        <p className="mt-3 text-xs text-navy-foreground/70">
          Try:{" "}
          {["Amine", "CC-PI-301", "Sulphonic"].map((s) => (
            <button key={s} type="button" onClick={() => setQ(s)} className="mr-2 rounded border border-navy-foreground/20 px-2 py-0.5 font-mono hover:bg-navy-foreground/10">{s}</button>
          ))}
        </p>
      )}
    </div>
  );
}
