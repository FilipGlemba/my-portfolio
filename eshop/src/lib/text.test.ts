import { describe, expect, it } from "vitest";
import { escapeRegex } from "@/lib/text";

describe("escapeRegex", () => {
  it("makes regex metacharacters match literally", () => {
    const pattern = new RegExp(escapeRegex("c++ (pro) $5"), "i");
    expect(pattern.test("C++ (Pro) $5 gloves")).toBe(true);
    expect(pattern.test("cc (pro) 5")).toBe(false);
  });

  it("turns a catastrophic-backtracking pattern into a harmless literal", () => {
    expect(escapeRegex("(a+)+$")).toBe("\\(a\\+\\)\\+\\$");
  });

  it("leaves plain words untouched", () => {
    expect(escapeRegex("running shoe")).toBe("running shoe");
  });
});
