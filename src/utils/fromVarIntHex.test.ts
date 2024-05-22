import { fromVarIntHex } from "./fromVarIntHex";

describe("fromVarIntHex", () => {
  it("should handle 0", () => {
    const hex = "00";
    const expectedNumber = 0;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers less than 253", () => {
    const hex = "fc";
    const expectedNumber = 252;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers between 253 and 65535", () => {
    const hex = "fdfd00";
    const expectedNumber = 253;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers between 253 and 65535", () => {
    const hex = "fdfe01";
    const expectedNumber = 510;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers between 253 and 65535", () => {
    const hex = "fd409c";
    const expectedNumber = 40000;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers between 253 and 65535", () => {
    const hex = "fdffff";
    const expectedNumber = 65535;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers between 65536 and 4294967295", () => {
    const hex = "fe00000100";
    const expectedNumber = 65536;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers greater than 4294967295", () => {
    const hex = "feffffffff";
    const expectedNumber = 4294967295;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers greater than 4294967295", () => {
    const hex = "ff0000000001000000";
    const expectedNumber = 4294967296;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should handle numbers greater than 4294967295", () => {
    const hex = "ffffffffffffff1f00";
    const expectedNumber = 9007199254740991;

    const result = fromVarIntHex(hex);

    expect(result).toEqual(expectedNumber);
  });

  it("should throw an error for invalid hex input: too short", () => {
    const hex = "fd";
    expect(() => fromVarIntHex(hex)).toThrowError(
      "Invalid fd hex input: incorrect length"
    );
  });

  it("should throw an error for invalid fd hex input: incorrect length", () => {
    const hex = "fdfe";
    expect(() => fromVarIntHex(hex)).toThrowError(
      "Invalid fd hex input: incorrect length"
    );
  });

  it("should throw an error for invalid fe hex input: incorrect length", () => {
    const hex = "fe0100";
    expect(() => fromVarIntHex(hex)).toThrowError(
      "Invalid fe hex input: incorrect length"
    );
  });

  it("should throw an error for number exceeding MAX_SAFE_INTEGER", () => {
    const hex = "ff0000000000000001";
    expect(() => fromVarIntHex(hex)).toThrowError(
      "Number exceeds MAX_SAFE_INTEGER, potential precision loss"
    );
  });
});
