import { describe, expect, it } from "vitest";
import { filterProducts, products } from "./products";

describe("filterProducts", () => {
  it("finds a product by catalogue code", () => {
    expect(filterProducts(products, { q: "cc-pi-301" }).map((p) => p.slug)).toEqual(["sample-pyridine-derivative-p1"]);
  });
  it("filters by category", () => {
    expect(filterProducts(products, { category: "dye-intermediates" })).toHaveLength(2);
  });
  it("filters by application", () => {
    expect(filterProducts(products, { application: "Coatings" }).every((p) => p.applications?.includes("Coatings"))).toBe(true);
  });
  it("returns nothing for unknown search", () => {
    expect(filterProducts(products, { q: "zzzz" })).toHaveLength(0);
  });
});
