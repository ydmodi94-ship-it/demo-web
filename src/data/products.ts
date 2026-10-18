// ILLUSTRATIVE DEMO DATA. Names are generic placeholders and CAS numbers are
// intentionally omitted — replace with each client's verified product data.

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  casNumber?: string;
  catalogueCode: string;
  category: string; // category slug
  description: string;
  grade?: string;
  specification?: { label: string; value: string }[];
  applications?: string[];
  packaging?: string[];
  publicDocuments?: { type: "TDS" | "SDS" | "Brochure"; available: boolean }[];
  enquiryEnabled: boolean;
};

export const categories: Category[] = [
  { slug: "organic-intermediates", name: "Organic Intermediates", description: "Building-block molecules for downstream organic synthesis." },
  { slug: "specialty-chemicals", name: "Specialty Chemicals", description: "Performance chemicals formulated for specific functional uses." },
  { slug: "pharmaceutical-intermediates", name: "Pharmaceutical Intermediates", description: "Intermediates supplied for API and pharma synthesis routes." },
  { slug: "dye-intermediates", name: "Dye Intermediates", description: "Intermediates used in reactive, acid and disperse dye manufacture." },
  { slug: "industrial-chemicals", name: "Industrial Chemicals", description: "Process chemicals and solvents for general industrial use." },
];

export const products: Product[] = [
  {
    id: "p1", slug: "sample-aromatic-amine-a1", name: "Sample Aromatic Amine A-1", catalogueCode: "CC-OI-101",
    category: "organic-intermediates", grade: "Technical",
    description: "Illustrative aromatic amine intermediate entry used to demonstrate the product-detail layout.",
    specification: [{ label: "Appearance", value: "To be confirmed by manufacturer" }, { label: "Assay", value: "As per client specification" }],
    applications: ["Dye manufacture", "Agrochemical synthesis"], packaging: ["25 kg HDPE drum", "200 kg drum"],
    publicDocuments: [{ type: "TDS", available: false }, { type: "SDS", available: false }], enquiryEnabled: true,
  },
  {
    id: "p2", slug: "sample-ester-o2", name: "Sample Aliphatic Ester O-2", catalogueCode: "CC-OI-102",
    category: "organic-intermediates", grade: "Industrial",
    description: "Illustrative ester intermediate. Specifications shown only to demonstrate formatting.",
    applications: ["Pharmaceutical synthesis", "Coatings"], packaging: ["200 L drum"], enquiryEnabled: true,
  },
  {
    id: "p3", slug: "sample-surfactant-s1", name: "Sample Surfactant Blend S-1", catalogueCode: "CC-SC-201",
    category: "specialty-chemicals",
    description: "Illustrative specialty additive entry. Grade data intentionally absent to show graceful handling.",
    applications: ["Textile processing", "Coatings"], packaging: ["50 kg carboy"], enquiryEnabled: true,
  },
  {
    id: "p4", slug: "sample-pyridine-derivative-p1", name: "Sample Pyridine Derivative P-1", catalogueCode: "CC-PI-301",
    category: "pharmaceutical-intermediates", grade: "Pharma intermediate",
    description: "Illustrative pharmaceutical intermediate entry demonstrating specification and document-request fields.",
    specification: [{ label: "Purity", value: "As per client specification" }, { label: "Moisture", value: "To be confirmed" }],
    applications: ["Pharmaceutical synthesis"], packaging: ["25 kg fibre drum"],
    publicDocuments: [{ type: "TDS", available: false }], enquiryEnabled: true,
  },
  {
    id: "p5", slug: "sample-piperazine-salt-p2", name: "Sample Heterocyclic Salt P-2", catalogueCode: "CC-PI-302",
    category: "pharmaceutical-intermediates", grade: "Pharma intermediate",
    description: "Illustrative heterocyclic intermediate entry for catalogue demonstration.",
    applications: ["Pharmaceutical synthesis", "Agrochemical synthesis"], enquiryEnabled: true,
  },
  {
    id: "p6", slug: "sample-naphthol-derivative-d1", name: "Sample Naphthalene Derivative D-1", catalogueCode: "CC-DI-401",
    category: "dye-intermediates", grade: "Technical",
    description: "Illustrative dye-intermediate entry demonstrating application tags and packaging options.",
    applications: ["Dye manufacture", "Textile processing"], packaging: ["25 kg bag", "50 kg bag"], enquiryEnabled: true,
  },
  {
    id: "p7", slug: "sample-sulphonic-acid-d2", name: "Sample Sulphonic Acid D-2", catalogueCode: "CC-DI-402",
    category: "dye-intermediates", grade: "Technical",
    description: "Illustrative sulphonic-acid intermediate entry for reactive dye catalogues.",
    specification: [{ label: "Form", value: "To be confirmed by manufacturer" }],
    applications: ["Dye manufacture"], packaging: ["25 kg HDPE bag"],
    publicDocuments: [{ type: "TDS", available: false }, { type: "SDS", available: false }], enquiryEnabled: true,
  },
  {
    id: "p8", slug: "sample-solvent-blend-i1", name: "Sample Process Solvent I-1", catalogueCode: "CC-IC-501",
    category: "industrial-chemicals", grade: "Industrial",
    description: "Illustrative industrial solvent entry. Not a real product listing.",
    applications: ["Coatings", "Cleaning & degreasing"], packaging: ["200 L drum", "1000 L IBC"], enquiryEnabled: true,
  },
];

export const allApplications = Array.from(new Set(products.flatMap((p) => p.applications ?? []))).sort();
export const allGrades = Array.from(new Set(products.map((p) => p.grade).filter(Boolean) as string[])).sort();

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type ProductFilters = { q?: string | undefined; category?: string | undefined; application?: string | undefined; grade?: string | undefined; sort?: "az" | "za" | undefined };

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  const q = f.q?.trim().toLowerCase();
  const out = list.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (f.application && !(p.applications ?? []).includes(f.application)) return false;
    if (f.grade && p.grade !== f.grade) return false;
    if (q) {
      const hay = [p.name, p.casNumber ?? "", p.catalogueCode].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  out.sort((a, b) => a.name.localeCompare(b.name));
  if (f.sort === "za") out.reverse();
  return out;
}
