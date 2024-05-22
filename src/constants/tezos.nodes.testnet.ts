import { RpcConfig } from "../utils/types";
import { ACURAST_ENVIRONMENT_VARIABLES } from "./acurast";

declare const _STD_: any;

export const tzproConfig: RpcConfig = {
  url: "https://rpc.ghost.tzpro.io/",
  port: 80,
  headers: {
    "X-API-key": _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.NODE_TZPRO_API_KEY],
  },
  certificate:
    "a7572bb023b6121c6e17126297fef5605984edeb8de85adba7a40911591d22da",
};

export const ecadConfig: RpcConfig = {
  url: "https://ghostnet.ecadinfra.com/",
  port: 80,
  headers: {},
  certificate:
    "6f38dd172b7a04dbfb8f0150e6e5bf8779803d0fcabf3a1667c04a59d1602476",
};

export const smartpyConfig: RpcConfig = {
  url: "https://ghostnet.smartpy.io/",
  port: 80,
  headers: {},
  certificate:
    "8e474702a384eaa659c42dc173b98af87bc79b9e3756743387e16c4272c91e67",
};

export const marigoldConfig: RpcConfig = {
  url: "https://ghostnet.tezos.marigold.dev/",
  port: 80,
  headers: {},
  certificate:
    "8c1cfc845f875edf8d11ab30859400f75b8bbfa820a5104eb6f55362336af770",
};

export const tezosTestnetNodes: RpcConfig[] = [
  tzproConfig,
  smartpyConfig,
  ecadConfig,
  marigoldConfig,
];

export const tezosTestnetBackupNodes = [];

export const tezosTestnetSuccessResponsesThreshold = 2;
