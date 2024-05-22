/**
 * Encodes a buffer using base58 encoding.
 *
 * @param buffer - The buffer to be encoded.
 * @returns The Base58 encoded string.
 */
export function base58Encode(buffer: Buffer): string {
  if (buffer.length === 0) {
    return "";
  }

  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let encoded = "";
  let num = BigInt("0x" + buffer.toString("hex"));

  if (num === BigInt(0)) {
    return "1".repeat(buffer.length);
  }

  while (num > 0) {
    const remainder = num % BigInt(alphabet.length);
    encoded = alphabet[Number(remainder)] + encoded;
    num = num / BigInt(alphabet.length);
  }

  for (let i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
    encoded = "1" + encoded;
  }

  return encoded;
}
