// taken from bitcoinjs

/**
 * Encodes the given R and S values of a signature using the BIP66 format.
 * Throws an error if the input values are invalid.
 *
 * @param r - The R value of the signature as a Buffer.
 * @param s - The S value of the signature as a Buffer.
 * @returns The encoded signature as a Buffer.
 * @throws Error if the input values are invalid.
 */
export function bip66SignatureEncode(r: Buffer, s: Buffer): Buffer {
  const lenR = r.length;
  const lenS = s.length;
  if (lenR === 0) throw new Error("R length is zero");
  if (lenS === 0) throw new Error("S length is zero");
  if (lenR > 33) throw new Error("R length is too long");
  if (lenS > 33) throw new Error("S length is too long");
  if (r[0] & 128) throw new Error("R value is negative");
  if (s[0] & 128) throw new Error("S value is negative");
  if (lenR > 1 && r[0] === 0 && !(r[1] & 128))
    throw new Error("R value excessively padded");
  if (lenS > 1 && s[0] === 0 && !(s[1] & 128))
    throw new Error("S value excessively padded");
  const signature = Buffer.allocUnsafe(6 + lenR + lenS);
  // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
  signature[0] = 48;
  signature[1] = signature.length - 2;
  signature[2] = 2;
  signature[3] = r.length;
  r.copy(signature, 4);
  signature[4 + lenR] = 2;
  signature[5 + lenR] = s.length;
  s.copy(signature, 6 + lenR);
  return signature;
}
