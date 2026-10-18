// Central, reusable brand + feature configuration. UI reads only from here.

export type FeatureFlags = {
  casSearch: boolean;
  technicalDocumentRequests: boolean;
  coaRequest: boolean;
  dyeSampleRequests: boolean;
  whatsappEnquiries: boolean;
  multiProductRFQ: boolean;
};

export type SiteConfig = {
  id: string;
  displayName: string;
  logoText: string;
  logoMark: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  contact: {
    email: string | null;
    phone: string | null;
    address: string | null;
    /** WhatsApp number in international format, digits only. Null hides the feature. */
    whatsappNumber: string | null;
  };
  hero: { headline: string; description: string };
  categoryOrder: string[];
  featuredSlugs: string[];
  features: FeatureFlags;
  emphasis: string;
  sector: "default" | "organic" | "specialty" | "pharma" | "dye" | "bulk";
  previewLabel: string;
};

const base: SiteConfig = {
  id: "chemcore",
  displayName: "ChemCore Industries",
  logoText: "ChemCore",
  logoMark: "CC",
  tagline: "Specialty & intermediate chemicals — demonstration catalogue",
  primaryColor: "#10253F",
  accentColor: "#0F9D91",
  contact: { email: null, phone: null, address: null, whatsappNumber: null },
  hero: {
    headline: "Specialty chemicals & intermediates",
    description:
      "Explore chemistry by category, review sample specifications and prepare a structured bulk enquiry.",
  },
  categoryOrder: [
    "organic-intermediates",
    "specialty-chemicals",
    "pharmaceutical-intermediates",
    "dye-intermediates",
    "industrial-chemicals",
  ],
  featuredSlugs: ["sample-aromatic-amine-a1", "sample-sulphonic-acid-d2", "sample-pyridine-derivative-p1", "sample-solvent-blend-i1"],
  features: {
    casSearch: true,
    technicalDocumentRequests: true,
    coaRequest: true,
    dyeSampleRequests: false,
    whatsappEnquiries: false,
    multiProductRFQ: false,
  },
  emphasis: "General specialty-chemical catalogue",
  sector: "default",
  previewLabel: "ChemCore · General catalogue",
};

/**
 * Development-only preview presets. They change emphasis and feature flags only —
 * the brand stays "ChemCore Industries" and no company-specific facts are invented.
 */
export const previewConfigs: Record<string, SiteConfig> = {
  chemcore: base,
  "preview-organic": {
    ...base,
    id: "preview-organic",
    sector: "organic",
    previewLabel: "01 · Organic chemical intermediates",
    emphasis: "Organic chemical intermediates",
    categoryOrder: ["organic-intermediates", ...base.categoryOrder.filter((c) => c !== "organic-intermediates")],
    featuredSlugs: ["sample-aromatic-amine-a1", "sample-ester-o2", "sample-pyridine-derivative-p1", "sample-sulphonic-acid-d2"],
    hero: { ...base.hero, headline: "Organic chemical intermediates" },
    features: { ...base.features, casSearch: true, multiProductRFQ: true },
  },
  "preview-specialty": {
    ...base,
    id: "preview-specialty",
    sector: "specialty",
    previewLabel: "02 · Fine & specialty chemicals",
    emphasis: "Fine and specialty chemicals",
    categoryOrder: ["specialty-chemicals", ...base.categoryOrder.filter((c) => c !== "specialty-chemicals")],
    featuredSlugs: ["sample-surfactant-s1", "sample-ester-o2", "sample-aromatic-amine-a1", "sample-solvent-blend-i1"],
    hero: { ...base.hero, headline: "Fine & specialty chemicals" },
    features: { ...base.features, casSearch: false, technicalDocumentRequests: true, coaRequest: false },
  },
  "preview-pharma": {
    ...base,
    id: "preview-pharma",
    sector: "pharma",
    previewLabel: "03 · Pharmaceutical intermediates",
    emphasis: "Pharmaceutical intermediates",
    categoryOrder: ["pharmaceutical-intermediates", ...base.categoryOrder.filter((c) => c !== "pharmaceutical-intermediates")],
    featuredSlugs: ["sample-pyridine-derivative-p1", "sample-piperazine-salt-p2", "sample-aromatic-amine-a1", "sample-ester-o2"],
    hero: { ...base.hero, headline: "Pharmaceutical intermediates" },
  },
  "preview-dye": {
    ...base,
    id: "preview-dye",
    sector: "dye",
    previewLabel: "04 · Dye intermediates",
    emphasis: "Dye intermediates",
    categoryOrder: ["dye-intermediates", ...base.categoryOrder.filter((c) => c !== "dye-intermediates")],
    featuredSlugs: ["sample-sulphonic-acid-d2", "sample-naphthol-derivative-d1", "sample-aromatic-amine-a1", "sample-solvent-blend-i1"],
    hero: { ...base.hero, headline: "Dye intermediates" },
    features: { ...base.features, dyeSampleRequests: true },
  },
  "preview-bulk": {
    ...base,
    id: "preview-bulk",
    sector: "bulk",
    previewLabel: "05 · Bulk chemical intermediates",
    emphasis: "Bulk chemical intermediates",
    categoryOrder: ["industrial-chemicals", "organic-intermediates", ...base.categoryOrder.filter((c) => c !== "industrial-chemicals" && c !== "organic-intermediates")],
    featuredSlugs: ["sample-solvent-blend-i1", "sample-aromatic-amine-a1", "sample-ester-o2", "sample-sulphonic-acid-d2"],
    hero: { ...base.hero, headline: "Bulk chemical intermediates" },
    features: { ...base.features, casSearch: true, multiProductRFQ: true },
  },
};

export const defaultConfig = base;
export const PREVIEW_STORAGE_KEY = "chemcore-preview-config";

export function resolveConfig(id: string | null, development: boolean): SiteConfig {
  return development && id && previewConfigs[id] ? previewConfigs[id] : defaultConfig;
}
