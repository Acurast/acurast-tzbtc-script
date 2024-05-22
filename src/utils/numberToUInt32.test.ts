import { numberToUint32 } from "./numberToUint32";

describe("numberToUint32", () => {
  it("should convert a number to a buffer", () => {
    const num = 123456789;
    const expectedBuffer = Buffer.from("15cd5b07", "hex");

    const result = numberToUint32(num);

    expect(result).toEqual(expectedBuffer);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedBuffer = Buffer.from("00000000", "hex");

    const result = numberToUint32(num);

    expect(result).toEqual(expectedBuffer);
  });
});
