import { fromVarIntHex } from "./fromVarIntHex";

/**
 * Reads a varInt-prefixed hex string and returns the prefix, data, and remaining hex string.
 *
 * @param hex - The varInt-prefixed hex string to read.
 * @returns An object containing the prefix, data, and remaining hex string.
 * @throws {Error} If the hex string does not contain enough data based on the prefix length.
 */
export const readVarIntPrefixedHex = function (hex: string): {
  prefix: string;
  data: string;
  rest: string;
} {
  // Determine the number of bytes from the varInt prefix using fromVarIntHex
  const bytesCount = fromVarIntHex(hex);
  const prefixLength = getVarIntPrefixLength(hex); // Helper function to get the length of the prefix in bytes

  // Calculate the total length in hex digits needed (1 byte = 2 hex digits)
  const totalHexLength = prefixLength + bytesCount * 2;

  if (hex.length < totalHexLength) {
    throw new Error(
      "Hex string does not contain enough data based on the prefix length"
    );
  }

  // Return the hex substring that contains the data bytes following the prefix
  return {
    prefix: hex.slice(0, 2),
    data: hex.substring(prefixLength, totalHexLength),
    rest: hex.substring(totalHexLength),
  };
};

// Helper function to determine the length of the prefix
function getVarIntPrefixLength(hex: string): number {
  const prefix = hex.slice(0, 2);
  switch (prefix) {
    case "fd":
      return 2 + 4; // 1 byte prefix + 2 bytes for data length indication
    case "fe":
      return 2 + 8; // 1 byte prefix + 4 bytes
    case "ff":
      return 2 + 16; // 1 byte prefix + 8 bytes
    default:
      return 2; // No prefix, just one byte by default
  }
}
