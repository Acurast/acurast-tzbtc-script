import { BTC_MAX_NETWORK_FEE } from "../constants/bitcoin";
import { UTXOInput, UTXOOutput } from "../types/utxo";
import { BurnMap } from "./getBurnMap";
import { tezosGetBurnMapValue } from "./rpc/tezos";

/**
 * Prepares a redeem Bitcoin transaction by fetching the necessary data from the Tezos chain.
 *
 * @param bigmapKeyHash The key hash of the big map.
 * @returns A promise that resolves to an object containing the UTXO inputs and outputs for the transaction.
 */
export async function prepareWithdrawBtcTx(
  bigmapKeyHash: string,
  gatekeeperAddress: string,
  custodyAddress: string
): Promise<{
  withdrawReceiver: string;
  inputs: UTXOInput[];
  outputs: UTXOOutput[];
}> {
  // TODO: Remove the Promise wrapper and use async/await directly
  return new Promise(async (resolve, reject) => {
    try {
      let mapValue: BurnMap = await tezosGetBurnMapValue(bigmapKeyHash);
      while (mapValue.utxo.length === 0) {
        // It is possible that the burn map is not yet populated, so we try until we get a value
        // Note: There is no "setTimeout" available in the current Acurast environment, so we retry immediately
        mapValue = await tezosGetBurnMapValue(bigmapKeyHash);
        console.log("Loaded burn map, UTXO length: ", mapValue.utxo.length);
      }

      const amount = mapValue.amount;
      const inputs = mapValue.utxo;
      const feeInSats = mapValue.fee;
      const withdrawReceiver = mapValue.receiver;

      const totalAmount = inputs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );

      if (feeInSats > amount) {
        throw new Error("fee too high or value too low");
      }

      if (feeInSats > BTC_MAX_NETWORK_FEE) {
        throw new Error("fee above limit");
      }

      // gatekeeper/user pays fee
      const outputs: UTXOOutput[] = [
        { recipient: gatekeeperAddress, amount: amount - feeInSats },
        { recipient: custodyAddress, amount: totalAmount - amount },
      ];

      return resolve({
        withdrawReceiver,
        inputs,
        outputs,
      });
    } catch (e) {
      console.log("ERROR prepareWithdrawBtcTx", e);
      return reject(e);
    }
  });
}
