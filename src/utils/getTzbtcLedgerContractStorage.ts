import { TZBTC_LEDGER_CONTRACT_ADDRESS } from "../constants/tezos";

declare const httpGET: any;

export type Root = {
  prim: string;
  args: Array<{
    prim?: string;
    args?: Array<{
      prim?: string;
      args?: Array<{
        prim?: string;
        args?: Array<{
          int: string;
        }>;
        bytes?: string;
        int?: string;
      }>;
      bytes?: string;
      int?: string;
      string?: string;
    }>;
    int?: string;
  }>;
};

export const parseStorage = async (
  storage: Root | undefined
): Promise<{
  custodyAddressHex: string; // bytes
  gatekeeperWithdrawAddressHex: string; // bytes
  signatureThreshold: number;
}> => {
  if (!storage) {
    throw new Error("Storage is empty");
  }

  return {
    gatekeeperWithdrawAddressHex: storage.args![0]!.args![0]!.args![1]!.bytes!, // bytes
    custodyAddressHex: storage.args![0]!.args![1]!.args![1]!.bytes!, // bytes
    signatureThreshold: parseInt(storage.args![1]!.args![3]!.int!, 10),
  };
};

/**
 * Retrieves the value from the burn map for a given key.
 * @param key - The key used to retrieve the burn map value.
 * @returns A Promise that resolves to an object representing the burn map value.
 */
export const getTzbtcLedgerContractStorage = function (
  rpcUrl: string,
  level: number,
  headers: Record<string, string>,
  pinnedCertificate: string
): Promise<{
  custodyAddressHex: string;
  gatekeeperWithdrawAddressHex: string;
  signatureThreshold: number;
}> {
  const tzbtcLedgerContractUrl = `${rpcUrl}chains/main/blocks/${level}/context/contracts/${TZBTC_LEDGER_CONTRACT_ADDRESS}/storage`;

  return new Promise((resolve, reject) => {
    httpGET(
      tzbtcLedgerContractUrl,
      headers,
      (response: string, certificate: string) => {
        if (pinnedCertificate !== certificate) {
          return reject(
            `Invalid certificate for "${rpcUrl}", got "${certificate}"`
          );
        }

        const parsed = JSON.parse(response);

        resolve(parseStorage(parsed));
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};
