import { btcEstimateSmartFee } from "./rpc/bitcoin";

export async function estimateFees(inputMultiplier: number = 1) {
  const response = await btcEstimateSmartFee();

  const feeRate = response.result.feerate;

  const sizeMultiplier = 20_000_000 * inputMultiplier; // fee is in bitcoin/kb our size is usually 200bytes so -> .2*1e8=20_000_000

  const fee = Math.trunc(feeRate * sizeMultiplier);

  // In case fee estimation fails, we use a fallback fee
  const feeInSats = isNaN(fee) ? 20_000 : fee;

  return feeInSats;
}
