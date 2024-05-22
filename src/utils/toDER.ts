// taken from bitcoinjs
export const ZERO = Buffer.alloc(1, 0);

/**
 * Converts a buffer to DER format (standard ECDSA encoding).
 *
 * @param x - The buffer to convert.
 * @returns The buffer in DER format.
 */
export function toDER(x: Buffer): Buffer {
  let i = 0;
  while (x[i] === 0) ++i;
  if (i === x.length) return ZERO;
  x = x.subarray(i);
  if (x[0] & 128) return Buffer.concat([ZERO, x], 1 + x.length);
  return x;
}
