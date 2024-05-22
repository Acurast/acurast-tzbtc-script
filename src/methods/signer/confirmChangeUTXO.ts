import { CONFIRMATION_THRESHOLD } from "../../constants/bitcoin";
import { bitcoinToSatoshis } from "../../utils/bitcoinToSatoshis";
import { tryRecipientToBytesHex } from "../../utils/recipientToBytesHex";
import { btcGetRawTransaction } from "../../utils/rpc/bitcoin";
import {
  tezosGetTzbtcLedgerContractStorage,
  tezosSendConfirmChangeUtxo,
} from "../../utils/rpc/tezos";

declare const _STD_: any;

/**
 * TEZOS => BTC: 3. step
 *
 * After the burn flow is done, this method confirms registers the new UTXO that was created
 * and sends funds to the custody address on the Tezos contract.
 *
 * @param transactionIdHex - The hexadecimal representation of the transaction ID.
 * @returns A promise that resolves with the hash of the Tezos contract call.
 * @throws If the UTXO is not confirmed above the threshold or if the recipient does not match.
 */
export async function confirmChangeUTXO(
  transactionIdHex: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const rawTransactionPayload = await btcGetRawTransaction(
        transactionIdHex
      );

      if (rawTransactionPayload.result.confirmations < CONFIRMATION_THRESHOLD) {
        return reject("not confirmed above threshold");
      }

      console.log(
        "rawTransactionPayload.result.vout",
        JSON.stringify(rawTransactionPayload.result.vout)
      );

      const { custodyAddressHex } = await tezosGetTzbtcLedgerContractStorage();

      // check that recipient of the UTXO is indeed the custody address
      const validVouts = rawTransactionPayload.result.vout.filter(
        (vout: any) =>
          tryRecipientToBytesHex(vout.scriptPubKey.address) ===
          custodyAddressHex
      );

      if (validVouts.length !== 1) {
        return reject("vout recipient does not match");
      }

      // post new utxo with confirmChangeUTXO entrypoint on Tezos
      const utxoPayload = {
        created_utxo: [
          {
            txId: `0x${transactionIdHex}`,
            output_no: validVouts[0].n,
            amount: bitcoinToSatoshis(validVouts[0].value),
          },
        ],
      };

      console.log(
        `transaction verified, calling tezos ontract with this payload:`,
        JSON.stringify(utxoPayload)
      );

      return tezosSendConfirmChangeUtxo(utxoPayload)
        .then(resolve)
        .catch(reject);
    } catch (e) {
      console.log("ERROR confirmChangeUTXO", e);
      return reject({
        message: (e as any)?.message ?? e,
        stack: (e as any).stack,
        error: e,
        data: {},
      });
    }
  });
}
