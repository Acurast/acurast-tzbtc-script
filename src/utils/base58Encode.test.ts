import { base58Encode } from "./base58Encode";

describe("base58Encode", () => {
  it("should encode empty buffer correctly", () => {
    const buffer = Buffer.from("", "hex");
    const expectedEncoded = "";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from("00", "hex");
    const expectedEncoded = "1";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from("0000000000000000", "hex");
    const expectedEncoded = "11111111";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from("000000000000000001", "hex");
    const expectedEncoded = "111111112";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from(
      "2194daa4db23ccc34900f914729412983650947651032475abcdefffffff00000f0f",
      "hex"
    );
    const expectedEncoded = "m2oM9b1C8XgTzLkKTT6daa6hAtY8Fz9btVyQDxpk3EDAML";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from(
      "02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cfeb05f9d2",
      "hex"
    );
    const expectedEncoded =
      "6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from("01", "hex");
    const expectedEncoded = "2";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from("0001", "hex");
    const expectedEncoded = "12";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should encode buffer correctly", () => {
    const buffer = Buffer.from("00000001", "hex");
    const expectedEncoded = "1112";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });

  it("should handle buffer with leading zeros", () => {
    const buffer = Buffer.from([0, 0, 0, 1]);
    const expectedEncoded = "1112";

    const result = base58Encode(buffer);

    expect(result).toEqual(expectedEncoded);
  });
});
