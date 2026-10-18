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
    headline: "Specialty Chemicals. Clear Specifications. Direct Enquiries.",
    description:
      "Discover chemical products, explore available technical information and submit bulk requirements through a streamlined B2B enquiry experience.",
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
};

/**
 * Development-only preview presets. They change emphasis and feature flags only —
 * the brand stays "ChemCore Industries" and no company-specific facts are invented.
 */
export const previewConfigs: Record<string, SiteConfig> = {
  chemcore: base,
  "preview-surya": {
    ...base,
    id: "preview-surya",
    emphasis: "Preview for Surya Organics & Chemicals — CAS search and bulk enquiry emphasis",
    hero: { ...base.hero, headline: "Find Chemicals by CAS Number. Enquire in Bulk." },
    features: { ...base.features, casSearch: true, multiProductRFQ: true },
  },
  "preview-amsal": {
    ...base,
    id: "preview-amsal",
    emphasis: "Preview for Amsal Chem Pvt. Ltd. — testing information and document requests",
    hero: { ...base.hero, headline: "Technical Information and Documentation, on Request." },
    features: { ...base.features, technicalDocumentRequests: true, coaRequest: true },
  },
  "preview-ashok": {
    ...base,
    id: "preview-ashok",
    emphasis: "Preview for Ashok Pharma Chem — pharma-intermediate discovery",
    categoryOrder: ["pharmaceutical-intermediates", ...base.categoryOrder.filter((c) => c !== "pharmaceutical-intermediates")],
    featuredSlugs: ["sample-pyridine-derivative-p1", "sample-piperazine-salt-p2", "sample-aromatic-amine-a1", "sample-ester-o2"],
    hero: { ...base.hero, headline: "Pharmaceutical Intermediates. Clear Specifications." },
  },
  "preview-mayur": {
    ...base,
    id: "preview-mayur",
    emphasis: "Preview for Mayur Dye Chem Industries — dye categories and sample requests",
    categoryOrder: ["dye-intermediates", ...base.categoryOrder.filter((c) => c !== "dye-intermediates")],
    featuredSlugs: ["sample-sulphonic-acid-d2", "sample-naphthol-derivative-d1", "sample-aromatic-amine-a1", "sample-solvent-blend-i1"],
    hero: { ...base.hero, headline: "Dye Intermediates for Textile and Industrial Applications." },
    features: { ...base.features, dyeSampleRequests: true },
  },
  "preview-richa": {
    ...base,
    id: "preview-richa",
    emphasis: "Preview for Richa Intermediates Pvt. Ltd. — CAS indexing and multi-product RFQs",
    hero: { ...base.hero, headline: "Indexed Intermediates. Multi-Product Quotations." },
    features: { ...base.features, casSearch: true, multiProductRFQ: true },
  },
};

export const defaultConfig = base;
export const PREVIEW_STORAGE_KEY = "chemcore-preview-config";
