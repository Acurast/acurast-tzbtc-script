import { numberToUint32Hex } from "./numberToUint32Hex";

describe("numberToUint32", () => {
  it("should convert a number to a hex string", () => {
    const num = 123456789;
    const expectedHex = "15cd5b07";

    const result = numberToUint32Hex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedHex = "00000000";

    const result = numberToUint32Hex(num);

    expect(result).toEqual(expectedHex);
  });
});
