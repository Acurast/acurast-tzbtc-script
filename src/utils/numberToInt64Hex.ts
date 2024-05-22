import { numberToInt64 } from "./numberToInt64";

/**
 * Converts a number to a hexadecimal string representation of its 64-bit integer value.
 * @param num The number to convert.
 * @returns The hexadecimal string representation of the 64-bit integer value.
 */
export const numberToInt64Hex = function (num: number): string {
  return numberToInt64(num).toString("hex");
};
