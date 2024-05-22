import { readVarIntPrefixedHex } from "./readVarIntPrefixedHex";

interface KeySignaturePair {
  publicKey: string;
  signature: string;
}

/**
 * Sorts an array of prefixed signatures lexicographically by public key.
 *
 * @param prefixedSignatureSet - The array of prefixed signatures to be sorted.
 * @returns The sorted array of signatures.
 */
export const sortPrefixedSignatures = function (
  prefixedSignatureSet?: string[][]
): undefined | string[][] {
  if (!prefixedSignatureSet) {
    return undefined;
  }
  const inputs: string[][] = [];

  for (const prefixedSignatures of prefixedSignatureSet) {
    const pairs: KeySignaturePair[] = [];

    for (const prefixedSignature of prefixedSignatures) {
      const { data: publicKey, rest: signature } =
        readVarIntPrefixedHex(prefixedSignature);

      const { rest } = readVarIntPrefixedHex(signature);
      if (rest !== "") {
        throw new Error("Prefixed Signature is not in expected format");
      }

      pairs.push({ publicKey, signature });
    }

    // Sort pairs by public key lexicographically
    pairs.sort((a, b) => a.publicKey.localeCompare(b.publicKey));

    inputs.push(pairs.map((pair) => pair.signature));
  }

  return inputs;
};
