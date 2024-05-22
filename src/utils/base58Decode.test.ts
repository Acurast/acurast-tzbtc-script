import { base58Decode } from "./base58Decode";

describe("base58Decode", () => {
  it("should decode base58 encoded string to a buffer", () => {
    // Decoding a valid base58 encoded string
    const input1 = "3yZe7d";
    const expectedOutput1 = Buffer.from([0x74, 0x65, 0x73, 0x74]);

    expect(base58Decode(input1)).toEqual(expectedOutput1);

    // Decoding a string with leading '1's
    const input2 = "1111abc";
    const expectedOutput2 = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x01, 0xb9, 0x7b,
    ]);
    expect(base58Decode(input2)).toEqual(expectedOutput2);

    // Decoding an empty string
    const input3 = "";
    const expectedOutput3 = Buffer.from([]);
    expect(base58Decode(input3)).toEqual(expectedOutput3);

    // Decoding a string with invalid characters
    const input4 = "3yZe7d!";
    expect(() => base58Decode(input4)).toThrow();
  });

  it("should decode base58 encoded string with special characters", () => {
    const input = "6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
    const expectedOutput =
      "02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cfeb05f9d2";
    expect(base58Decode(input).toString("hex")).toEqual(expectedOutput);
  });
});
