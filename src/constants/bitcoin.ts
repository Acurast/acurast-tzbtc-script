import { RpcConfig } from "../utils/types";
import {
  bitcoinTestnetConfirmationThreshold,
  bitcoinTestnetSuccessResponsesThreshold,
  bitcoinTestnetNodes,
} from "./bitcoin.nodes.testnet";

export const bitcoinNodes: RpcConfig[] = bitcoinTestnetNodes;

/**
 * The maximum network fee that can be paid for a transaction. This is a failsafe to prevent fees from being too high.
 */
export const BTC_MAX_NETWORK_FEE = 1_000_000;

/**
 * The key derivation path for the BTC multisig.
 */
export const BTC_KEY_DERIVATION = "m/0/1";

/**
 * The number of confirmations required for a transaction to be considered valid.
 */
export const CONFIRMATION_THRESHOLD = bitcoinTestnetConfirmationThreshold;

/**
 * The number of required successful responses when calling RPCs.
 */
export const BTC_REQUIRED_SUCCESSFUL_RESPONSES =
  bitcoinTestnetSuccessResponsesThreshold;
