import { RpcConfig } from "../utils/types";
import { ACURAST_ENVIRONMENT_VARIABLES } from "./acurast";

declare const _STD_: any;

export const inferenceConfig: RpcConfig = {
  url: "https://rpc.inference.ag/bitcoin",
  port: 80,
  headers: {
    "x-api-key":
      _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_INFERENCE_API_KEY],
  },
  certificate:
    "39c58f6cae25b9b2b86cf65435346ba6e41cdb94ace2ca541e960974d5a01a03",
};

export const tzProConfig: RpcConfig = {
  url: "https://btc.tzpro.io",
  port: 80,
  headers: {
    "x-api-key": _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_TZPRO_API_KEY],
  },
  certificate:
    "a7572bb023b6121c6e17126297fef5605984edeb8de85adba7a40911591d22da",
};

export const bakingBadConfig: RpcConfig = {
  url: "https://node.baking-bad.org/bitcore",
  port: 80,
  headers: {
    Authorization:
      _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_BAKING_BAD_BTC_API_KEY],
  },
  certificate:
    "b734ca8cde6783a9c691d111ed293a1830fccada493745c59be6b97bda17e43a",
};

export const foundationConfig: RpcConfig = {
  url: "https://rpctzb.tzinit.org/bitcoin",
  port: 80,
  headers: {
    "x-api-key":
      _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_TEZOS_FOUNDATION_API_KEY],
  },
  certificate:
    "32e5fd26de60ad08fdacae015d111a8b58c55a663130b5e5a3c517feb83738d3",
};

export const papersConfig: RpcConfig = {
  url: "https://bitcoin-rpc-1.sky.papers.tech",
  port: 80,
  headers: {
    Authorization: _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_PAPERS_API_KEY],
  },
  certificate:
    "42051d844777c5a1b8e87ad676417b7232ed0623200a07746a1d0ac3aa3946f9",
};

export const bitcoinMainnetNodes: RpcConfig[] = [
  inferenceConfig,
  tzProConfig,
  bakingBadConfig,
  foundationConfig,
  papersConfig,
];

export const bitcoinMainnetSuccessResponsesThreshold = 3;

export const bitcoinMainnetConfirmationThreshold = 6;
