import { POLYMOD_GENERATORS } from "../constants/constants";

/**
 * Calculates the polynomial modulus of an array of values.
 *
 * @param values - An array of numbers.
 * @returns The polynomial modulus of the input values.
 */
export const polymod = function (values: number[]): number {
  let checksum: number = 1;
  for (let value of values) {
    const topBits: number = checksum >>> 25;
    checksum = ((checksum & 33554431) << 5) ^ value;
    for (let i = 0; i < 5; i++) {
      if ((topBits >>> i) & 1) {
        checksum ^= POLYMOD_GENERATORS[i];
      }
    }
  }
  return checksum;
};
