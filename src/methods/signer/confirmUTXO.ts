import { CONFIRMATION_THRESHOLD } from "../../constants/bitcoin";
import { createPersonalDepositRedeemScript } from "../../utils/createPersonalDepositRedeemScript";
import { bitcoinToSatoshis } from "../../utils/bitcoinToSatoshis";
import { base58Encode } from "../../utils/base58Encode";
import { btcGetRawTransaction } from "../../utils/rpc/bitcoin";
import { tezosSendConfirmUtxo } from "../../utils/rpc/tezos";

declare const _STD_: any;

/**
 *  BTC => TEZOS: 2. step
 *
 * Confirms the details of a transaction (eg. if the custody address is the recipient) and if yes,
 * registers the UTXO on the Tezos blockchain so it can be used during the burn process in the future.
 *
 * @param transactionIdHex - The transaction ID in hexadecimal format.
 * @param ownGateKeeperPublicKeyHex - The public key of the own gatekeeper in hexadecimal format.
 * @param otherGateKeeperPublicKeyHex - The public key of the other gatekeeper in hexadecimal format.
 * @param backupPublicKeyHex - The backup public key in hexadecimal format.
 * @param recipientTezosAddressHex - The recipient Tezos address in hexadecimal format.
 * @returns A promise that resolves to the hash of the confirmation transaction on success, or rejects with an error message on failure.
 */
export function confirmUTXO(
  transactionIdHex: string,
  ownGateKeeperPublicKeyHex: string,
  otherGateKeeperPublicKeyHex: string,
  backupPublicKeyHex: string,
  recipientTezosAddressHex: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const DEPOSIT_FORWARD_TRANSACTION_OUTPUT_INDEX = 0; // We create this tx in gatekeeperDepositForwardTransaction, is always 0

      const rawTransactionPayload = await btcGetRawTransaction(
        transactionIdHex
      );

      if (rawTransactionPayload.result.confirmations < CONFIRMATION_THRESHOLD) {
        return reject("BTC tx not confirmed above threshold");
      }

      const valueInSats = bitcoinToSatoshis(
        rawTransactionPayload.result.vout[
          DEPOSIT_FORWARD_TRANSACTION_OUTPUT_INDEX
        ].value
      );
      const redeemScriptHex = createPersonalDepositRedeemScript(
        recipientTezosAddressHex,
        ownGateKeeperPublicKeyHex,
        otherGateKeeperPublicKeyHex,
        backupPublicKeyHex
      );

      if (
        rawTransactionPayload.result.vin[
          DEPOSIT_FORWARD_TRANSACTION_OUTPUT_INDEX
        ].txinwitness[2] !== redeemScriptHex
      ) {
        return reject("recipient does not match");
      }

      const utxoPayload = {
        amount: valueInSats,
        output_no: DEPOSIT_FORWARD_TRANSACTION_OUTPUT_INDEX,
        receiver: base58Encode(Buffer.from(recipientTezosAddressHex, "hex")),
        txid: `0x${transactionIdHex}`,
      };

      return tezosSendConfirmUtxo(utxoPayload).then(resolve).catch(reject);
    } catch (e) {
      console.log("ERROR confirmUTXO", e);
      return reject({
        message: (e as any)?.message ?? e,
        stack: (e as any).stack,
        error: e,
        data: {},
      });
    }
  });
}
