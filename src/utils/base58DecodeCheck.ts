import { base58Decode } from "./base58Decode";
declare const _STD_: any;

const sha256: (input: string) => string = _STD_.chains.bitcoin.signer.sha256;

// TODO: In this method, we split "version" and "payload" into separate variables. This is not part of the base58check encoding standard. We use this to determine the version of the bitcoin address. The code here is correct, but we should probably re-name it to avoid confusion. Because the security review is already done and we have tested everything thoroughly, we will leave this change for the next update.

/**
 * Decodes a base58 encoded string and performs a checksum validation.
 * If the checksum is valid, returns the decoded payload.
 * If the checksum is invalid, throws an error indicating data corruption or incorrectness.
 *
 * @param input - The base58 encoded string to decode.
 * @returns The decoded payload if the checksum is valid.
 * @throws An error if the checksum is invalid.
 */
export const base58DecodeCheck = function (input: string): {
  version: number;
  payload: Buffer;
} {
  const buffer = base58Decode(input);
  const payload = buffer.subarray(0, -4);
  const checksum = buffer.subarray(-4);
  const calculatedChecksum = Buffer.from(
    sha256(sha256(payload.toString("hex"))),
    "hex"
  ).subarray(0, 4);
  if (calculatedChecksum.equals(checksum)) {
    return { version: payload[0], payload: payload.subarray(1) };
  } else {
    throw new Error("Invalid checksum, data is corrupted or incorrect.");
  }
};
