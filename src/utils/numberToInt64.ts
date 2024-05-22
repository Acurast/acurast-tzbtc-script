/**
 * Converts a number to a 64-bit integer represented as a Buffer.
 *
 * @param num - The number to convert.
 * @returns A Buffer representing the 64-bit integer.
 */
export const numberToInt64 = function (num: number): Buffer {
  const buffer = Buffer.alloc(8);
  buffer.writeBigInt64LE(BigInt(num));
  return buffer;
};
