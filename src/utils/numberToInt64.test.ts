import { numberToInt64 } from "./numberToInt64";

describe("numberToInt64", () => {
  it("should convert a number to a buffer", () => {
    const num = 123456789;
    const expectedBuffer = Buffer.from("15cd5b0700000000", "hex");

    const result = numberToInt64(num);

    expect(result).toEqual(expectedBuffer);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedBuffer = Buffer.from("0000000000000000", "hex");

    const result = numberToInt64(num);

    expect(result).toEqual(expectedBuffer);
  });
});
