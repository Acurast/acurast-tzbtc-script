import { prepareWithdrawBtcTx } from "../../utils/prepareWithdrawBtcTx";
import { craftSegwitTransaction } from "../../utils/craftSegwitTransaction";
import { estimateFees } from "../../utils/estimateFees";
import {
  recipientToBytesHex,
  tryRecipientToBytesHex,
} from "../../utils/recipientToBytesHex";
import { btcSendRawTransaction } from "../../utils/rpc/bitcoin";
import { tezosGetTzbtcLedgerContractStorage } from "../../utils/rpc/tezos";

/**
 * TEZOS => BTC: 2. step
 *
 * This method is triggered once enough signatures are collected on the Tezos contract. It then
 * aggregates all the signatures into a bitcoin transaction and broadcasts it to the network.
 * It then immediately creates a new transaction that forwards the BTC to the recipient and sends
 * the change to the custody address.
 *
 * @param bigmapKeyHash - The key hash for the big map.
 * @param custodyRedeemScriptHex - The custody redeem script in hexadecimal format.
 * @param gatekeeperRedeemScriptHex - The gatekeeper redeem script in hexadecimal format.
 * @returns A promise that resolves to an object containing the transaction ID and transaction hex.
 * @throws If there is an error during the withdrawal and forwarding process.
 */
export function gatekeeperWithdrawForwardTransaction(
  bigmapKeyHash: string,
  custodyRedeemScriptHex: string,
  gatekeeperRedeemScriptHex: string
): Promise<{
  withdrawTxId: string;
  withdrawTxHex: string;
  forwardTxId: string;
  forwardTxHex: string;
}> {
  // We keep track of the transaction IDs and data. In case of an error, we can return them alongside the error message.
  let withdrawTxId: string | undefined;
  let withdrawTxHex: string | undefined;
  let forwardTxId: string | undefined;
  let forwardTxHex: string | undefined;
  return new Promise(async (resolve, reject) => {
    try {
      const {
        custodyAddressHex,
        gatekeeperWithdrawAddressHex,
        signatureThreshold,
      } = await tezosGetTzbtcLedgerContractStorage();

      const { withdrawReceiver, inputs, outputs } = await prepareWithdrawBtcTx(
        bigmapKeyHash,
        gatekeeperWithdrawAddressHex,
        custodyAddressHex
      );

      ({ transactionHex: withdrawTxHex, transactionHash: withdrawTxId } =
        craftSegwitTransaction(
          inputs.map((input) => ({
            transactionIdHex: input.txId,
            inputIndex: input.outputNo,
            value: input.amount,
            redeemScript: Buffer.from(custodyRedeemScriptHex, "hex"),
          })),
          outputs,
          signatureThreshold,
          inputs.map((input) => input.prefixedSignatures)
        ));

      // Because logs cannot be so long
      console.log("withdrawTx Length", withdrawTxHex.length);
      console.log("withdrawTx1", withdrawTxHex.slice(0, 3000));
      console.log("withdrawTx2", withdrawTxHex.slice(3000));

      const withdrawTxResponse = await btcSendRawTransaction(withdrawTxHex);

      // Error -27 means transaction already in block chain
      // Error -25 means bad-txns-inputs-missingorspent, which can happen if the signatures are different, but the transaction is already in the blockchain
      // We can continue, because we can calculate the txId
      if (
        !withdrawTxResponse.result &&
        withdrawTxResponse.error?.code !== -27 &&
        withdrawTxResponse.error?.code !== -25
      ) {
        console.log(
          "rawTransactionResponse",
          JSON.stringify(withdrawTxResponse.error)
        );
        return reject(withdrawTxResponse.error);
      }

      console.log("withdrawTx worked");

      withdrawTxId = (withdrawTxResponse.result ?? withdrawTxId) as string;
      console.log("withdrawTxId from response or calculated", withdrawTxId);

      const validOuts = outputs.filter(
        (output) =>
          tryRecipientToBytesHex(output.recipient) ===
          gatekeeperWithdrawAddressHex
      );

      if (validOuts.length !== 1) {
        return reject("more than one matching output to gatekeeperAddress");
      }

      const feeInSats = await estimateFees();

      const output = validOuts[0];

      const WITHDRAWAL_INPUT_INDEX = 0; // We create this tx in prepareWithdrawBtcTx, is always 0

      ({ transactionHex: forwardTxHex, transactionHash: forwardTxId } =
        craftSegwitTransaction(
          [
            {
              transactionIdHex: withdrawTxId,
              inputIndex: WITHDRAWAL_INPUT_INDEX,
              value: output.amount,
              redeemScript: Buffer.from(gatekeeperRedeemScriptHex, "hex"),
            },
          ],
          [
            {
              recipient: recipientToBytesHex(withdrawReceiver),
              amount: output.amount - feeInSats,
            },
          ],
          1
        ));

      console.log("FORWARD TRANSACTION HEX", forwardTxHex);

      const forwardTxResponse = await btcSendRawTransaction(forwardTxHex);

      if (forwardTxResponse.result) {
        console.log(
          "forwardTxResponse success",
          JSON.stringify(forwardTxResponse.result)
        );
        return resolve({
          withdrawTxId: withdrawTxId,
          withdrawTxHex: withdrawTxHex,
          forwardTxId: forwardTxResponse.result,
          forwardTxHex: forwardTxHex,
        });
      } else {
        if (forwardTxResponse.error?.code === -27) {
          // Error -27 means transaction already in block chain
          // We can continue, because we can calculate the forwardTxId

          console.log("forwardTxResponse (tx already in chain)", forwardTxId);
          return resolve({
            withdrawTxId: withdrawTxId,
            withdrawTxHex: withdrawTxHex,
            forwardTxId: forwardTxId,
            forwardTxHex: forwardTxHex,
          });
        }

        console.log(
          "forwardTxResponse error",
          JSON.stringify(forwardTxResponse.error)
        );
        return reject({
          message: forwardTxResponse.error,
          data: {
            withdrawTxId: withdrawTxId,
            withdrawTxHex: withdrawTxHex,
            forwardTxHex: forwardTxHex,
            forwardTxId: forwardTxId,
          },
        });
      }
    } catch (e) {
      console.log("ERROR gatekeeperWithdrawForwardTransaction", e);
      return reject({
        message: (e as any)?.message ?? e,
        stack: (e as any).stack,
        error: e,
        data: {
          withdrawTxId: withdrawTxId,
          withdrawTxHex: withdrawTxHex,
          forwardTxHex: forwardTxHex,
          forwardTxId: forwardTxId,
        },
      });
    }
  });
}
