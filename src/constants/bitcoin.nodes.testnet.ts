import { RpcConfig } from "../utils/types";
import { ACURAST_ENVIRONMENT_VARIABLES } from "./acurast";

declare const _STD_: any;

export const tzproConfig: RpcConfig = {
  url: "https://btc-test.tzpro.io/",
  port: 80,
  headers: {
    "x-api-key": _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_TZPRO_API_KEY],
  },
  certificate:
    "a7572bb023b6121c6e17126297fef5605984edeb8de85adba7a40911591d22da",
};

export const getblockConfig: RpcConfig = {
  url: "https://go.getblock.io/9a3a2c7eeef34faeb41642717b6f1872",
  port: 80,
  headers: {},
  certificate:
    "50d1c5289822483d7c001babc934cc938186f8b6b061cfe5b10ad47590c67305",
};

export const allThatNodeConfig: RpcConfig = {
  url: "https://bitcoin-testnet-archive.allthatnode.com",
  port: 80,
  headers: {},
  certificate:
    "23db2e8224a95c546d09f0254a496c9bcbb7b6fe9977c3077a52b2c45b895b30",
};

export const agedConfig: RpcConfig = {
  url: "https://aged-methodical-leaf.btc-testnet.quiknode.pro/ce81a1d524ce06c9c8454f4a8a5c84adea0067a4",
  port: 80,
  headers: {},
  certificate:
    "9968797d440be4e27e5df7334584d28712aa03ae02726fc746ac182da34e0464",
};

export const bitcoinTestnetNodes: RpcConfig[] = [
  tzproConfig,
  getblockConfig,
  allThatNodeConfig,
  agedConfig,
];

export const bitcoinTestnetSuccessResponsesThreshold = 2;

export const bitcoinTestnetConfirmationThreshold = 1;
