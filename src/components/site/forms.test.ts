import { describe, expect, it } from "vitest";
import { rfqSchema } from "./forms";

const valid = {
  contactName: "A", businessEmail: "a@b.com", companyName: "Co", product: "X",
  quantity: "10", unit: "kg", destination: "Bharuch", consent: "on",
};

describe("rfqSchema", () => {
  it("accepts a complete enquiry", () => expect(rfqSchema.safeParse(valid).success).toBe(true));
  it("requires consent", () => expect(rfqSchema.safeParse({ ...valid, consent: undefined }).success).toBe(false));
  it("rejects a malformed CAS number", () => expect(rfqSchema.safeParse({ ...valid, casNumber: "abc" }).success).toBe(false));
});
