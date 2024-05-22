import { numberToUint8 } from "./numberToUint8";

describe("numberToUint8", () => {
  it("should convert a number to a Uint8 buffer", () => {
    const num = 255;
    const expectedBuffer = Buffer.from([255]);

    const result = numberToUint8(num);

    expect(result).toEqual(expectedBuffer);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedBuffer = Buffer.from([0]);

    const result = numberToUint8(num);

    expect(result).toEqual(expectedBuffer);
  });
});
