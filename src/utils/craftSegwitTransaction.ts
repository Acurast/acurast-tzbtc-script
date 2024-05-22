import { SEQUENCE_BYTES, LOCKTIME_BYTES } from "../constants/constants";
import { toVarIntHex } from "./toVarIntHex";
import { numberToUint32Hex } from "./numberToUint32Hex";
import { numberToInt64Hex } from "./numberToInt64Hex";
import { bufferToVarSlice } from "./bufferToVarSlice";
import { bitcoinEncodeSignature } from "./bitcoinEncodeSignature";
import { tryRecipientToBytesHex } from "./recipientToBytesHex";
import { hashForWitness } from "./hashForWitness";
import { getRandomElementsInOrder } from "./getRandomElementsInOrder";
import { sortPrefixedSignatures } from "./sortPrefixedSignatures";
import { BTC_KEY_DERIVATION } from "../constants/bitcoin";

declare const _STD_: any;

const sha256: (input: string) => string = _STD_.chains.bitcoin.signer.sha256;
const rawSignHD: (input: string, derivationPath: string) => string =
  _STD_.chains.bitcoin.signer.rawSignHD;

export const craftSegwitTransaction = function (
  inputs: {
    transactionIdHex: string;
    inputIndex: number;
    value: number;
    redeemScript: Buffer;
  }[],
  outputs: { recipient: string; amount: number }[],
  signatureThreshold: number,
  prefixedSignatures?: string[][]
): { transactionHex: string; transactionHash: string } {
  const version = "02000000";
  const segwitMarker = "0001";
  const unlockScriptLength = toVarIntHex(0); //because it's segwit

  const signatures = sortPrefixedSignatures(prefixedSignatures);

  const inputCount = toVarIntHex(inputs.length);
  const inputsPayload = inputs.reduce(
    (accumulator, currentValue) =>
      accumulator +
      Buffer.from(currentValue.transactionIdHex, "hex")
        .reverse()
        .toString("hex") +
      numberToUint32Hex(currentValue.inputIndex) +
      unlockScriptLength +
      SEQUENCE_BYTES.toString("hex"),
    ""
  );

  const outputCount = toVarIntHex(outputs.length);
  const outputsPayload = outputs.reduce(
    (accumulator, currentValue) =>
      accumulator +
      numberToInt64Hex(currentValue.amount) +
      tryRecipientToBytesHex(currentValue.recipient),
    ""
  );

  const txDataHex = `${inputCount}${inputsPayload}${outputCount}${outputsPayload}`;

  const segwitTransactionPrefix = `${version}${segwitMarker}${txDataHex}`;
  const noSigTransactionPrefix = `${version}${txDataHex}`;

  const transactionSuffix = `${LOCKTIME_BYTES.toString("hex")}`;

  console.log("INPUTS", JSON.stringify(inputs));
  console.log("OUTPUTS", JSON.stringify(outputs));

  let segwitData = "";
  if (signatures && signatures.length > 0) {
    console.log("Signatures were provided, adding them to transaction...");
    console.log("SIGNATURES", signatures, JSON.stringify(signatures));
    if (signatures.length !== inputs.length) {
      throw new Error("Signature length does not match inputs length");
    }

    segwitData = inputs.reduce((inputAccumulator, input, index) => {
      const selectedSignatures = getRandomElementsInOrder(
        signatures[index],
        signatureThreshold
      );
      return (
        inputAccumulator +
        `${toVarIntHex(
          2 + selectedSignatures.length
        )}00${selectedSignatures.reduce(
          (sigAccumulator, signature) => sigAccumulator + signature,
          ""
        )}${bufferToVarSlice(input.redeemScript).toString("hex")}`
      );
    }, "");
  } else {
    console.log("No signatures provided, signing...");
    segwitData = inputs.reduce((inputAccumulator, input) => {
      const signature = bufferToVarSlice(
        bitcoinEncodeSignature(
          Buffer.from(
            rawSignHD(
              hashForWitness(
                2,
                input.transactionIdHex,
                input.inputIndex,
                input.redeemScript,
                input.value,
                inputs,
                outputs
              ),
              BTC_KEY_DERIVATION
            ),
            "hex"
          )
        )
      ).toString("hex");

      console.log("Signature", signature);

      // 03 <- this specifies how many parameters are provided, with multisig we have to provide a dummy 0 and then the signature(s) and then the redeem script, if more signatures are provided 03 will grow to more.
      return (
        inputAccumulator +
        `0300${signature}${bufferToVarSlice(input.redeemScript).toString(
          "hex"
        )}`
      );
    }, "");
  }

  const transactionWithSignatureHex = `${segwitTransactionPrefix}${segwitData}${transactionSuffix}`;
  const transactionWithoutSignature = `${noSigTransactionPrefix}${transactionSuffix}`;

  // Double sha256 and reverse the transaction to get the txid
  const txHash = Buffer.from(sha256(sha256(transactionWithoutSignature)), "hex")
    .reverse()
    .toString("hex");

  return {
    transactionHex: transactionWithSignatureHex,
    transactionHash: txHash,
  };
};
