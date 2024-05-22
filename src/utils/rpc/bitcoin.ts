import {
  BTC_REQUIRED_SUCCESSFUL_RESPONSES,
  bitcoinNodes,
} from "../../constants/bitcoin";
import { multiRPCPostCall } from "../multiRPCPostCall";

export const btcGetRawTransaction = async (transactionIdHex: string) => {
  return multiRPCPostCall(
    bitcoinNodes,
    BTC_REQUIRED_SUCCESSFUL_RESPONSES,
    "getrawtransaction",
    [transactionIdHex, true]
  );
};

export const btcSendRawTransaction = async (transactionHex: string) => {
  return multiRPCPostCall(
    bitcoinNodes,
    BTC_REQUIRED_SUCCESSFUL_RESPONSES,
    "sendrawtransaction",
    [transactionHex]
  );
};

export const btcEstimateSmartFee = async () => {
  return multiRPCPostCall(
    bitcoinNodes,
    BTC_REQUIRED_SUCCESSFUL_RESPONSES,
    "estimatesmartfee",
    [6, "CONSERVATIVE"]
  );
};
