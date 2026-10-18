import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";
import { previewConfigs } from "@/config/site";
import { useSiteConfig } from "./config-context";
import { Logo } from "./Header";

export function Footer() {
  const { config, setPreview } = useSiteConfig();
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-navy-foreground/70">{config.tagline}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-foreground">Navigate</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/70">
            <li><Link to="/products" className="hover:text-navy-foreground">Product catalogue</Link></li>
            <li><Link to="/categories" className="hover:text-navy-foreground">Categories</Link></li>
            <li><Link to="/manufacturing" className="hover:text-navy-foreground">Manufacturing</Link></li>
            <li><Link to="/quality" className="hover:text-navy-foreground">Quality & documentation</Link></li>
            <li><Link to="/about" className="hover:text-navy-foreground">About</Link></li>
            <li><Link to="/quote" className="hover:text-navy-foreground">Request a quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-foreground">Categories</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/categories/$slug" params={{ slug: c.slug }} className="hover:text-navy-foreground">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-foreground">Contact</h3>
          <p className="text-sm text-navy-foreground/70">
            Contact details are placeholders and will be replaced with verified client information.
          </p>
          <Link to="/contact" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">Contact page →</Link>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-page space-y-3 py-6 text-xs text-navy-foreground/60">
          <p>
            <strong className="text-navy-foreground/80">Demonstration disclosure:</strong> ChemCore Industries is a fictional brand created to
            demonstrate a website design. Product names, specifications and company information are illustrative and must not be used for
            procurement, manufacturing, handling or safety decisions. Enquiry forms in this demo do not transmit or store data.
          </p>
          <p>Privacy: this demo does not set tracking cookies or collect personal data. © {new Date().getFullYear()} Demo build.</p>
          {import.meta.env.DEV && (
            <label className="flex flex-wrap items-center gap-2">
              <span>Dev-only preview config:</span>
              <select
                value={config.id}
                onChange={(e) => setPreview(e.target.value)}
                className="rounded border border-navy-foreground/20 bg-navy-soft px-2 py-1 text-navy-foreground"
              >
                {Object.values(previewConfigs).map((c) => (
                  <option key={c.id} value={c.id}>{c.id === "chemcore" ? "ChemCore (default)" : c.emphasis.split(" — ")[0]}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>
    </footer>
  );
}
