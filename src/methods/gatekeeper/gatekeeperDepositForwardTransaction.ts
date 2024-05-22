import { bitcoinToSatoshis } from "../../utils/bitcoinToSatoshis";
import { craftSegwitTransaction } from "../../utils/craftSegwitTransaction";
import { createPersonalDepositRedeemScript } from "../../utils/createPersonalDepositRedeemScript";
import { estimateFees } from "../../utils/estimateFees";
import {
  btcGetRawTransaction,
  btcSendRawTransaction,
} from "../../utils/rpc/bitcoin";
import { tezosGetTzbtcLedgerContractStorage } from "../../utils/rpc/tezos";

declare const _STD_: any;

const sha256: (input: string) => string = _STD_.chains.bitcoin.signer.sha256;

/**
 * BTC => TEZOS: 1. step
 *
 * Forwards a deposit transaction to the gatekeeper.
 *
 * The user deposits the BTC to a specially crafted address, which the gatekeeper can unlock.
 * In this method, the gatekeeper forwards the deposit to the custody address.
 *
 * @param transactionIdHex - The hexadecimal representation of the transaction ID.
 * @param targetRecipientHex - The hexadecimal representation of the target recipient.
 * @param gatekeeper1PublicKeyHex - The hexadecimal representation of the first gatekeeper's public key.
 * @param gatekeeper2PublicKeyHex - The hexadecimal representation of the second gatekeeper's public key.
 * @param backupPublicKeyHex - The hexadecimal representation of the backup public key.
 * @returns A promise that resolves to an object containing the transaction ID and transaction hexadecimal representation.
 * @throws If the vout recipient does not match, the vout value is below the threshold, the fee is too high or the value is too low, or an error occurs during the process.
 */
export function gatekeeperDepositForwardTransaction(
  transactionIdHex: string,
  targetRecipientHex: string,
  gatekeeper1PublicKeyHex: string,
  gatekeeper2PublicKeyHex: string,
  backupPublicKeyHex: string
): Promise<{ txId: string; txHex: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const valueThreshold = 1000;
      const rawTransactionPayload = await btcGetRawTransaction(
        transactionIdHex
      );

      const userDepositGatekeeperRedeemScriptHex =
        createPersonalDepositRedeemScript(
          targetRecipientHex,
          gatekeeper1PublicKeyHex,
          gatekeeper2PublicKeyHex,
          backupPublicKeyHex
        );

      const p2wshOutputScript = sha256(userDepositGatekeeperRedeemScriptHex);

      const validVouts = rawTransactionPayload.result.vout.filter(
        (vout: any) => vout.scriptPubKey.hex === `0020${p2wshOutputScript}`
      );
      if (validVouts.length !== 1) {
        return reject(
          `vout recipient does not match. Found "${validVouts.length}" matching vouts`
        );
      }

      const validVOutValueInSats = bitcoinToSatoshis(validVouts[0].value);
      if (validVOutValueInSats <= valueThreshold) {
        return reject(`vout value below threshold "${validVOutValueInSats}"`);
      }

      const feeInSats = await estimateFees();
      if (feeInSats > validVOutValueInSats) {
        return reject("fee too high or value too low");
      }

      const { custodyAddressHex } = await tezosGetTzbtcLedgerContractStorage();

      const { transactionHex, transactionHash } = craftSegwitTransaction(
        [
          {
            transactionIdHex,
            inputIndex: validVouts[0].n,
            value: validVOutValueInSats,
            redeemScript: Buffer.from(
              userDepositGatekeeperRedeemScriptHex,
              "hex"
            ),
          },
        ],
        [
          {
            recipient: custodyAddressHex,
            amount: validVOutValueInSats - feeInSats,
          },
        ],
        1
      );

      const rawTransactionResponse = await btcSendRawTransaction(
        transactionHex
      );

      if (rawTransactionResponse.result) {
        console.log(
          "rawTransactionResponse success",
          JSON.stringify(rawTransactionResponse.result)
        );
        return resolve({
          txId: rawTransactionResponse.result,
          txHex: transactionHex,
        });
      } else {
        if (rawTransactionResponse.error?.code === -27) {
          // Error -27 means transaction already in block chain
          // We can continue, because we can calculate the txId

          console.log(
            "rawTransactionResponse (tx already in chain)",
            transactionHex
          );
          return resolve({
            txId: transactionHash,
            txHex: transactionHex,
          });
        }

        console.log(
          "rawTransactionResponse error",
          JSON.stringify(rawTransactionResponse.error)
        );
        return reject({
          message: rawTransactionResponse.error,
          data: { txHex: transactionHex },
        });
      }
    } catch (e) {
      console.log("ERROR gatekeeperDepositForwardTransaction");
      return reject({
        message: (e as any)?.message ?? e,
        stack: (e as any).stack,
        error: e,
        data: {},
      });
    }
  });
}
