import { RpcConfig } from "../utils/types";
import { ACURAST_ENVIRONMENT_VARIABLES } from "./acurast";

declare const _STD_: any;

export const inferenceConfig: RpcConfig = {
  url: "https://rpc.inference.ag/tezos/",
  port: 80,
  headers: {
    "X-API-key":
      _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_INFERENCE_API_KEY],
  },
  certificate:
    "39c58f6cae25b9b2b86cf65435346ba6e41cdb94ace2ca541e960974d5a01a03",
};

export const tzProConfig: RpcConfig = {
  url: "https://rpc.tzpro.io/",
  port: 80,
  headers: {
    "X-API-key": _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_TZPRO_API_KEY],
  },
  certificate:
    "a7572bb023b6121c6e17126297fef5605984edeb8de85adba7a40911591d22da",
};

export const bakingBadConfig: RpcConfig = {
  url: "https://node.baking-bad.org/octez/",
  port: 80,
  headers: {
    Authorization:
      _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_BAKING_BAD_XTZ_API_KEY],
  },
  certificate:
    "b734ca8cde6783a9c691d111ed293a1830fccada493745c59be6b97bda17e43a",
};

export const foundationConfig: RpcConfig = {
  url: "https://rpc.tzbeta.net/",
  port: 80,
  headers: {},
  certificate:
    "21e5a0fe639ab9d53745030698bbd3f7cffb5ba5ae48b0d863610b2a5a11df5b",
};

export const papersConfig: RpcConfig = {
  url: "https://tezos-node.prod.gke.papers.tech/",
  port: 80,
  headers: {
    Authorization: _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_PAPERS_API_KEY],
  },
  certificate:
    "221e007bc91eb3973728d120ee6f3387695464192784f62d458f7bd1fc1d5bf6",
};

export const tezosMainnetNodes: RpcConfig[] = [
  inferenceConfig,
  tzProConfig,
  bakingBadConfig,
  foundationConfig,
  papersConfig,
];

export const tezosMainnetBackupNodes = [
  "https://mainnet.ecadinfra.com/",
  "https://mainnet.smartpy.io/",
  "https://mainnet.tezos.marigold.dev/",
];

export const tezosMainnetSuccessResponsesThreshold = 3;
