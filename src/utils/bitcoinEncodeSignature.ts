import { numberToUint8 } from "./numberToUint8";
import { bip66SignatureEncode } from "./bip66SignatureEncode";
import { toDER } from "./toDER";

/**
 * Encodes a Bitcoin signature.
 *
 * @param payload - The payload to be encoded.
 * @returns The encoded signature.
 */
export const bitcoinEncodeSignature = function (payload: Buffer): Buffer {
  const rawR = toDER(payload.subarray(0, 32));
  const rawS = toDER(payload.subarray(32, 64));
  const bip66Signature = bip66SignatureEncode(rawR, rawS);
  return Buffer.concat([bip66Signature, numberToUint8(1)]); //forced to sighash all
};
