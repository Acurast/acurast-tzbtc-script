/**
 * Converts a hexadecimal string representation of a variable-length integer to a number.
 *
 * @param hex - The hexadecimal string to convert.
 * @returns The converted number.
 * @throws {Error} If the hex input is invalid or the number exceeds MAX_SAFE_INTEGER.
 */
export const fromVarIntHex = function (hex: string): number {
  const buffer = Buffer.from(hex, "hex");
  if (hex.length < 2) {
    throw new Error("Invalid hex input: too short");
  }

  const prefix = hex.slice(0, 2);

  switch (prefix) {
    case "fd":
      if (hex.length < 6) {
        // "fd" + 4 hex digits (2 bytes)
        throw new Error("Invalid fd hex input: incorrect length");
      }
      return buffer.readUInt16LE(1); // Skip first byte (prefix) and read the next 2 bytes as a little endian number
    case "fe":
      if (hex.length < 10) {
        // "fe" + 8 hex digits (4 bytes)
        throw new Error("Invalid fe hex input: incorrect length");
      }
      return buffer.readUInt32LE(1); // Skip first byte and read the next 4 bytes as a little endian number
    case "ff":
      if (hex.length < 18) {
        // "ff" + 16 hex digits (8 bytes)
        throw new Error("Invalid ff hex input: incorrect length");
      }
      const bigIntValue = buffer.readBigInt64LE(1);
      if (bigIntValue > BigInt(Number.MAX_SAFE_INTEGER)) {
        throw new Error(
          "Number exceeds MAX_SAFE_INTEGER, potential precision loss"
        );
      }
      return Number(bigIntValue);
    default:
      // No prefix means it's a small number (0x00 to 0xfc)
      return buffer.readUInt8(0); // Read the first byte directly
  }
};
