import { readVarIntPrefixedHex } from "./readVarIntPrefixedHex";

describe("readVarIntPrefixedHex", () => {
  it("should return the correct prefix, data, and rest for valid input", () => {
    const hex = "03abcdefabcdef";
    const expectedOutput = {
      prefix: "03",
      data: "abcdef",
      rest: "abcdef",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the correct prefix, data, and rest for valid input for zero", () => {
    const hex = "00";
    const expectedOutput = {
      prefix: "00",
      data: "",
      rest: "",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the correct prefix, data, and rest for valid input for zero", () => {
    const hex = "00aa";
    const expectedOutput = {
      prefix: "00",
      data: "",
      rest: "aa",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the correct prefix, data, and rest for valid input for zero", () => {
    const hex = "01aaaa";
    const expectedOutput = {
      prefix: "01",
      data: "aa",
      rest: "aa",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the correct prefix, data, and rest for valid input for a signature", () => {
    const hex =
      "483045022100dc0c84d82fb3c03f6a34ac37dbbddfba24902942a1b90e9ee1cc51e6b69a91e20220334500a031bcf8bdf1aba9b5e7f9edd88ac6bfda9f8a6419a078282bfe1235b801";

    const expectedOutput = {
      prefix: "48",
      data: "3045022100dc0c84d82fb3c03f6a34ac37dbbddfba24902942a1b90e9ee1cc51e6b69a91e20220334500a031bcf8bdf1aba9b5e7f9edd88ac6bfda9f8a6419a078282bfe1235b801",
      rest: "",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the correct prefix, data, and rest for valid input for an address hex", () => {
    const hex =
      "2200200bb840d8434584db924137f5c0ceedc3d3370ba7c73a2c90db83e99102bcb5f1483045022100dc0c84d82fb3c03f6a34ac37dbbddfba24902942a1b90e9ee1cc51e6b69a91e20220334500a031bcf8bdf1aba9b5e7f9edd88ac6bfda9f8a6419a078282bfe1235b801";

    const expectedOutput = {
      prefix: "22",
      data: "00200bb840d8434584db924137f5c0ceedc3d3370ba7c73a2c90db83e99102bcb5f1",
      rest: "483045022100dc0c84d82fb3c03f6a34ac37dbbddfba24902942a1b90e9ee1cc51e6b69a91e20220334500a031bcf8bdf1aba9b5e7f9edd88ac6bfda9f8a6419a078282bfe1235b801",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should return the correct prefix, data, and rest for valid input for concatenated address and signature", () => {
    const hex =
      "2200200bb840d8434584db924137f5c0ceedc3d3370ba7c73a2c90db83e99102bcb5f1";

    const expectedOutput = {
      prefix: "22",
      data: "00200bb840d8434584db924137f5c0ceedc3d3370ba7c73a2c90db83e99102bcb5f1",
      rest: "",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });

  it("should throw an error for hex string with insufficient data", () => {
    const hex = "fdfe";
    expect(() => readVarIntPrefixedHex(hex)).toThrowError(
      "Invalid fd hex input: incorrect length"
    );
  });

  it("should return the correct prefix, data, and rest for valid input", () => {
    const hex = "0100abcdef";
    const expectedOutput = {
      prefix: "01",
      data: "00",
      rest: "abcdef",
    };

    const result = readVarIntPrefixedHex(hex);

    expect(result).toEqual(expectedOutput);
  });
});
