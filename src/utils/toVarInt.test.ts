import { toVarInt } from "./toVarInt";

describe("toVarInt", () => {
  it("should handle numbers less than 253", () => {
    const num = 252;
    const expectedBuffer = Buffer.from("fc", "hex");

    const result = toVarInt(num);

    expect(result).toEqual(expectedBuffer);
  });

  it("should handle zero", () => {
    const num = 0;
    const expectedBuffer = Buffer.from("00", "hex");

    const result = toVarInt(num);

    expect(result).toEqual(expectedBuffer);
  });
});
