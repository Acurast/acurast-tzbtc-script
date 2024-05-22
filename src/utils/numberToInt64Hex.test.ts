import { numberToInt64Hex } from "./numberToInt64Hex";

describe("numberToInt64Hex", () => {
  it("should convert a number to a hex string", () => {
    const num = 123456789;
    const expectedHex = "15cd5b0700000000";

    const result = numberToInt64Hex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedHex = "0000000000000000";

    const result = numberToInt64Hex(num);

    expect(result).toEqual(expectedHex);
  });
});
