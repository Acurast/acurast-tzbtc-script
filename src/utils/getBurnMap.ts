import { BURN_MAP_ID } from "../constants/tezos";
import { UTXOInput } from "../types/utxo";

export declare const httpGET: any;

// https://ghostnet.tezos.marigold.dev/chains/main/blocks/head/context/big_maps/410981/expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS

export type Root = {
  prim: string;
  args: [
    {
      string: string;
    },
    {
      string: string;
    },
    {
      int: string;
    },
    {
      int: string;
    },
    {
      int: string;
    },
    Array<{
      prim: string;
      args: Array<{
        prim: string;
        args: [
          {
            bytes?: string;
            int?: string;
          },
          any
        ];
      }>;
    }>
  ];
};

export interface BurnMap {
  proposer: string;
  receiver: string;
  amount: number;
  state: number;
  fee: number;
  utxo: UTXOInput[];
}

export const parseBurnMap = async (
  burnMap: Root | undefined
): Promise<BurnMap> => {
  if (!burnMap) {
    throw new Error("Burn map is empty");
  }

  return {
    proposer: burnMap.args[0].string,
    receiver: burnMap.args[1].string,
    amount: Number(burnMap.args[2].int),
    state: Number(burnMap.args[3].int),
    fee: Number(burnMap.args[4].int),
    utxo:
      // "as any" is needed because the typings have optional values, but we know that they are there
      (burnMap.args[5]?.map((value): UTXOInput => {
        return {
          txId: value.args[0].args[0].bytes!,
          outputNo: Number(value.args[0].args[1].int),
          amount: Number(value.args[1].args[0].int),
          prefixedSignatures:
            value.args[1].args[1]?.map((el: any) => {
              return el.args[1].bytes;
            }) ?? [],
        };
      }) as any) ?? [],
  };
};

/**
 * Retrieves the value from the burn map for a given key.
 * @param key - The key used to retrieve the burn map value.
 * @returns A Promise that resolves to an object representing the burn map value.
 */
export const getBurnMap = function (
  rpcUrl: string,
  level: number,
  headers: Record<string, string>,
  pinnedCertificate: string,
  burnBigmapKeyHash: string
): Promise<BurnMap> {
  return new Promise((resolve, reject) => {
    const burnmapUrl = `${rpcUrl}chains/main/blocks/${level}/context/big_maps/${BURN_MAP_ID}/${burnBigmapKeyHash}`;

    httpGET(
      burnmapUrl,
      headers,
      (response: string, certificate: string) => {
        if (pinnedCertificate !== certificate) {
          return reject(
            `Invalid certificate for "${rpcUrl}", got "${certificate}"`
          );
        }

        const parsed: Root = JSON.parse(response);

        resolve(parseBurnMap(parsed));
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};
