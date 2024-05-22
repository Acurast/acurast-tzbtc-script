import { SEQUENCE_BYTES, LOCKTIME_BYTES } from "../constants/constants";
import { numberToUint32 } from "./numberToUint32";
import { numberToInt64 } from "./numberToInt64";
import { bufferToVarSlice } from "./bufferToVarSlice";
import { tryRecipientToBytesHex } from "./recipientToBytesHex";

declare const _STD_: any;

const sha256: (input: string) => string = _STD_.chains.bitcoin.signer.sha256;

/**
 * Vanilla implementation of hashForWitness, taken inspiration from https://github.com/bitcoinjs/bitcoinjs-lib/blob/894ad02b5d9c4979b064298eacbc462098dc01ac/src/transaction.js#L398
 * @param version bitcoin transaction version
 * @param transactionIdHex transaction id as returned by bitcoin JSON RPC (is reversed for TX)
 * @param inputIndex the index of the UTXO
 * @param inputScript the actual script used to unlock said input
 * @param inputValue the amount of the input
 * @param inputs the inputs
 * @param outputs the outputs
 * @returns
 */
export const hashForWitness = function (
  version: number,
  transactionIdHex: string,
  inputIndex: number,
  inputScript: Buffer,
  inputValue: number,
  inputs: { transactionIdHex: string; inputIndex: number }[],
  outputs: { recipient: string; amount: number }[]
): string {
  const SIGHASH_ALL_BYTES = numberToUint32(1); // sighash is hardcoded, don't allow to modify TX
  const inputsHash = sha256(
    sha256(
      inputs
        .reduce((accumulator, currentValue) => {
          return Buffer.concat([
            accumulator,
            Buffer.from(currentValue.transactionIdHex, "hex").reverse(),
            numberToUint32(currentValue.inputIndex),
          ]);
        }, Buffer.alloc(0))
        .toString("hex")
    )
  );
  const sequenceHash = sha256(
    sha256(
      inputs
        .reduce((accumulator, _) => {
          return Buffer.concat([accumulator, SEQUENCE_BYTES]);
        }, Buffer.alloc(0))
        .toString("hex")
    )
  );
  const outputsHash = sha256(
    sha256(
      outputs
        .reduce((accumulator, currentValue) => {
          return Buffer.concat([
            accumulator,
            numberToInt64(currentValue.amount),
            Buffer.from(tryRecipientToBytesHex(currentValue.recipient), "hex"),
          ]);
        }, Buffer.alloc(0))
        .toString("hex")
    )
  );

  const signaturePayload = Buffer.concat([
    numberToUint32(version),
    Buffer.from(inputsHash, "hex"),
    Buffer.from(sequenceHash, "hex"),
    Buffer.from(transactionIdHex, "hex").reverse(),
    numberToUint32(inputIndex),
    bufferToVarSlice(inputScript),
    numberToInt64(inputValue),
    SEQUENCE_BYTES,
    Buffer.from(outputsHash, "hex"),
    LOCKTIME_BYTES,
    SIGHASH_ALL_BYTES,
  ]);

  return sha256(sha256(signaturePayload.toString("hex")));
};
