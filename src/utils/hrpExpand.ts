/**
 * Expands the human-readable part (HRP) of a Bech32 address into an array of numbers.
 * Each character in the HRP is converted to its corresponding 5-bit value.
 *
 * @param hrp - The human-readable part of a Bech32 address.
 * @returns An array of numbers representing the expanded HRP.
 */
export const hrpExpand = function (hrp: string): number[] {
  const ret: number[] = [];
  for (let p = 0; p < hrp.length; p++) {
    ret.push(hrp.charCodeAt(p) >>> 5);
  }
  ret.push(0);
  for (let p = 0; p < hrp.length; p++) {
    ret.push(hrp.charCodeAt(p) & 31);
  }
  return ret;
};
