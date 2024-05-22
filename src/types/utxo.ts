export type UTXOInput = {
  txId: string;
  outputNo: number;
  amount: number;
  prefixedSignatures: string[];
};
export type UTXOOutput = { recipient: string; amount: number };
