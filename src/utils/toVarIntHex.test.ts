import { toVarIntHex } from "./toVarIntHex";

describe("toVarIntHex", () => {
  it("should handle 0", () => {
    const num = 0;
    const expectedHex = "00";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers less than 253", () => {
    const num = 252;
    const expectedHex = "fc";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 253 and 65535", () => {
    const num = 253;
    const expectedHex = "fdfd00";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 253 and 65535", () => {
    const num = 40000;
    const expectedHex = "fd409c";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 253 and 65535", () => {
    const num = 65535;
    const expectedHex = "fdffff";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 65535 and 4294967295", () => {
    const num = 65536;
    const expectedHex = "fe00000100";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 65535 and 4294967295", () => {
    const num = 20000000;
    const expectedHex = "fe002d3101";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 65535 and 4294967295", () => {
    const num = 4294967295;
    const expectedHex = "feffffffff";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 4294967295 and 9007199254740991", () => {
    const num = 4294967296;
    const expectedHex = "ff0000000001000000";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 4294967295 and 9007199254740991", () => {
    const num = 4000000000000000;
    const expectedHex = "ff00001a93fa350e00";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle numbers between 4294967295 and 9007199254740991", () => {
    const num = 9007199254740991;
    const expectedHex = "ffffffffffffff1f00";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedHex = "00";

    const result = toVarIntHex(num);

    expect(result).toEqual(expectedHex);
  });
});
