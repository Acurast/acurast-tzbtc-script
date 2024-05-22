import { numberToUint32 } from "./numberToUint32";

/**
 * Converts a number to a hexadecimal string representation of its 32-bit unsigned integer value.
 *
 * @param num - The number to convert.
 * @returns The hexadecimal string representation of the 32-bit unsigned integer value.
 */
export const numberToUint32Hex = function (num: number): string {
  return numberToUint32(num).toString("hex");
};
