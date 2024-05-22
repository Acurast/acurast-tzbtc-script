import { toVarIntHex } from "./toVarIntHex";

/**
 * Converts a number to a variable-length hexadecimal string encoded as a buffer.
 *
 * @param value - The number to convert.
 * @returns The buffer of the number.
 * @throws Error if the value is greater than Number.MAX_SAFE_INTEGER.
 */
export const toVarInt = function (value: number): Buffer {
  return Buffer.from(toVarIntHex(value), "hex");
};
