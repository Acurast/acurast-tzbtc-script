import {
  TEZOS_RPCs,
  TZBTC_LEDGER_CONTRACT_ADDRESS,
  XTZ_REQUIRED_SUCCESSFUL_RESPONSES,
  backupNodes,
} from "../../constants/tezos";
import { getBurnMap } from "../getBurnMap";
import { getHeader } from "../getHeader";
import { getTzbtcLedgerContractStorage } from "../getTzbtcLedgerContractStorage";
import { selectResponse } from "../selectResponse";

declare const _STD_: any;

const tezosCustomCall = async (
  entrypoint: "sign_burn" | "confirm_utxo" | "confirm_change_utxo",
  payload: any
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log("tezosCustomCall", entrypoint, JSON.stringify(payload));
    _STD_.chains.tezos.customCall(
      [...TEZOS_RPCs.map((rpc) => rpc.url), ...backupNodes],
      payload,
      {
        fee: 15000,
        gasLimit: 30000,
        storageLimit: 50000,
        destination: TZBTC_LEDGER_CONTRACT_ADDRESS,
        entrypoint,
      },
      (hash: string) => {
        console.log("hash", hash);
        return resolve(hash);
      },
      (err: string) => {
        console.log("err", err);
        return reject(err);
      }
    );
  });
};

export const tezosSendSignBurn = async (payload: {
  burn_id: number;
  signatures: { output_no: number; signature: string; tx_id: string }[];
}): Promise<string> => {
  return tezosCustomCall("sign_burn", payload);
};

export const tezosSendConfirmUtxo = async (payload: {
  amount: number;
  output_no: number;
  receiver: string;
  txid: string;
}): Promise<string> => {
  return tezosCustomCall("confirm_utxo", payload);
};

export const tezosSendConfirmChangeUtxo = async (payload: {
  created_utxo: {
    txId: string;
    output_no: number;
    amount: number;
  }[];
}): Promise<string> => {
  return tezosCustomCall("confirm_change_utxo", payload);
};

export const tezosGetTzbtcLedgerContractStorage = async (): Promise<{
  custodyAddressHex: string;
  gatekeeperWithdrawAddressHex: string;
  signatureThreshold: number;
}> => {
  const header = await tezosGetHeader();
  const finalizedLevel = header.level - 2;

  const responsePromises = TEZOS_RPCs.map(async (rpc) => {
    return getTzbtcLedgerContractStorage(
      rpc.url,
      finalizedLevel,
      rpc.headers,
      rpc.certificate
    );
  });

  const responses = await Promise.allSettled(responsePromises);

  return selectResponse(
    responses,
    TEZOS_RPCs.length,
    XTZ_REQUIRED_SUCCESSFUL_RESPONSES
  );
};

export const tezosGetBurnMapValue = async (burnBigmapKeyHash: string) => {
  const header = await tezosGetHeader();
  const finalizedLevel = header.level - 2;

  const responsePromises = TEZOS_RPCs.map(async (rpc) => {
    return getBurnMap(
      rpc.url,
      finalizedLevel,
      rpc.headers,
      rpc.certificate,
      burnBigmapKeyHash
    );
  });

  const responses = await Promise.allSettled(responsePromises);

  return selectResponse(
    responses,
    TEZOS_RPCs.length,
    XTZ_REQUIRED_SUCCESSFUL_RESPONSES
  );
};

export const tezosGetHeader = async () => {
  const responsePromises = TEZOS_RPCs.map(async (rpc) => {
    return getHeader(rpc.url, rpc.headers, rpc.certificate);
  });

  const responses = await Promise.allSettled(responsePromises);

  return selectResponse(
    responses,
    TEZOS_RPCs.length,
    XTZ_REQUIRED_SUCCESSFUL_RESPONSES
  );
};
