import { RpcConfig } from "../utils/types";
import {
  tezosTestnetNodes,
  tezosTestnetBackupNodes,
  tezosTestnetSuccessResponsesThreshold,
} from "./tezos.nodes.testnet";

export const TEZOS_RPCs: RpcConfig[] = tezosTestnetNodes;

// We add backup nodes for injection in case the main nodes fail
export const backupNodes = tezosTestnetBackupNodes;

export const TZBTC_LEDGER_CONTRACT_ADDRESS =
  "KT1JAtuHBSVYdgBLzNij18rd6nVR7twTQJ6g";
export const BURN_MAP_ID = "412571";

/**
 * The number of required successful responses when calling RPCs.
 */
export const XTZ_REQUIRED_SUCCESSFUL_RESPONSES =
  tezosTestnetSuccessResponsesThreshold;
