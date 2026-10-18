import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSiteConfig } from "./config-context";
import { btn } from "./styles";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/applications", label: "Applications" },
  { to: "/quality", label: "Quality" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  const { config } = useSiteConfig();
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${config.displayName} home`}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-teal font-mono text-sm font-semibold text-navy-foreground">
        {config.logoMark}
      </span>
      <span className={`text-lg font-bold tracking-tight ${light ? "text-navy-foreground" : "text-navy"}`}>
        {config.logoText}
        <span className="font-normal text-teal"> Industries</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-navy text-navy-foreground">
        <p className="container-page py-1.5 text-center text-xs">
          Demonstration website — ChemCore Industries is a fictional brand. All products and data are illustrative.
        </p>
      </div>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-navy"
              activeProps={{ className: "text-navy font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/quote" className={`${btn.primary} hidden sm:inline-flex`}>
            Request a Quote
          </Link>
          <button
            className="grid h-11 w-11 place-items-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 font-medium text-navy hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)} className={`${btn.primary} mt-2`}>
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
