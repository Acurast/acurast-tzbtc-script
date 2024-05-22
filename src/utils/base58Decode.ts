/**
 * Decodes a Base58 encoded string into a Buffer.
 *
 * @param input - The Base58 encoded string to decode.
 * @returns The decoded Buffer.
 */
export const base58Decode = function (input: string): Buffer {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let decoded = 0n;

  for (let i = 0; i < input.length; i++) {
    const char = input[input.length - 1 - i];

    if (!alphabet.includes(char)) {
      throw new Error(`Non-base58 character "${char}"`);
    }

    decoded += BigInt(alphabet.indexOf(char)) * BigInt(58) ** BigInt(i);
  }

  // Convert numeric (BigInt) result to a byte array
  let bytes: number[] = [];
  while (decoded > 0) {
    bytes.push(Number(decoded % 256n));
    decoded = decoded / 256n;
  }

  // Adjust for leading '1's which are mapped to zero bytes in Bitcoin addresses
  for (let i = 0; i < input.length && input[i] === "1"; i++) {
    bytes.push(0);
  }

  return Buffer.from(bytes.reverse());
};
