import { bitcoinToSatoshis } from "./bitcoinToSatoshis";

describe("bitcoinToSatoshis", () => {
  it("should convert whole bitcoins to satoshis correctly", () => {
    const voutValue = 1.23456789;
    const expectedSatoshis = 123456789;

    const result = bitcoinToSatoshis(voutValue);

    expect(result).toBe(expectedSatoshis);
  });

  it("should convert fractional bitcoins to satoshis correctly", () => {
    const voutValue = 0.12345678;
    const expectedSatoshis = 12345678;

    const result = bitcoinToSatoshis(voutValue);

    expect(result).toBe(expectedSatoshis);
  });

  it("should convert whole and fractional bitcoins to satoshis correctly", () => {
    const voutValue = 2.3456789;
    const expectedSatoshis = 234567890;

    const result = bitcoinToSatoshis(voutValue);

    expect(result).toBe(expectedSatoshis);
  });
});
