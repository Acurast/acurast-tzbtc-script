import { bitcoinEncodeSignature } from "../../utils/bitcoinEncodeSignature";
import { hashForWitness } from "../../utils/hashForWitness";
import { bufferToVarSlice } from "../../utils/bufferToVarSlice";
import { prepareWithdrawBtcTx } from "../../utils/prepareWithdrawBtcTx";
import {
  tezosGetTzbtcLedgerContractStorage,
  tezosSendSignBurn,
} from "../../utils/rpc/tezos";
import { hexToVarSliceHex } from "../../utils/hexToVarSliceHex";
import { BTC_KEY_DERIVATION } from "../../constants/bitcoin";

declare const _STD_: any;

const rawSignHD: (input: string, derivationPath: string) => string =
  _STD_.chains.bitcoin.signer.rawSignHD;

/**
 * TEZOS => BTC: 1. step
 *
 * After the user proposes a burn, the backend confirms it and assigns the UTXOs to use.
 * In this method, we get those UTXOs, construct the transaction, sign it, and store the
 * signatures on the Tezos contract by calling the "sign_burn" entrypoint.
 *
 * @param burnId - The ID of the burn transaction.
 * @param custodyRedeemScriptHex - The hex representation of the custody redeem script.
 * @returns A promise that resolves to the signed transaction hash.
 */
export async function signBurn(
  burnId: number,
  custodyRedeemScriptHex: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const { custodyAddressHex, gatekeeperWithdrawAddressHex } =
        await tezosGetTzbtcLedgerContractStorage();

      const bigmapKeyHash = _STD_.chains.tezos.encoding.encodeExpr(burnId);

      if (!bigmapKeyHash) {
        throw new Error(
          `Could not encode burnId "${burnId}" to bigmap key hash`
        );
      }

      const { inputs, outputs } = await prepareWithdrawBtcTx(
        bigmapKeyHash,
        gatekeeperWithdrawAddressHex,
        custodyAddressHex
      );

      let signatures: { signature: string; outputNo: number; txId: string }[] =
        [];

      signatures = inputs.map((value) => ({
        signature: bufferToVarSlice(
          bitcoinEncodeSignature(
            Buffer.from(
              rawSignHD(
                hashForWitness(
                  2,
                  value.txId,
                  value.outputNo,
                  Buffer.from(custodyRedeemScriptHex, "hex"),
                  value.amount,
                  inputs.map((value) => ({
                    transactionIdHex: value.txId,
                    inputIndex: value.outputNo,
                  })),
                  outputs
                ),
                BTC_KEY_DERIVATION
              ),
              "hex"
            )
          )
        ).toString("hex"),
        outputNo: value.outputNo,
        txId: value.txId,
      }));

      console.log("signatures", JSON.stringify(signatures));

      const ownBtcPublicKey = hexToVarSliceHex(
        _STD_.chains.bitcoin.getPublicKey(BTC_KEY_DERIVATION)
      );

      const utxoPayload = {
        burn_id: burnId,
        signatures: signatures.map((sig) => ({
          output_no: sig.outputNo,
          signature: `0x${ownBtcPublicKey}${sig.signature}`,
          tx_id: `0x${sig.txId}`,
        })),
      };

      console.log("utxoPayload", JSON.stringify(utxoPayload));

      return tezosSendSignBurn(utxoPayload).then(resolve).catch(reject);
    } catch (e) {
      console.log("ERROR signBurn", e);
      return reject({
        message: (e as any)?.message ?? e,
        stack: (e as any).stack,
        error: e,
        data: {},
      });
    }
  });
}
