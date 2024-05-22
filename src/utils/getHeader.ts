export declare const httpGET: any;

// https://tezos-ghostnet-node-1.diamond.papers.tech/chains/main/blocks/head/header

type Header = {
  protocol: string;
  chain_id: string;
  hash: string;
  level: number;
  proto: number;
  predecessor: string;
  timestamp: string;
  validation_pass: number;
  operations_hash: string;
  fitness: Array<string>;
  context: string;
  payload_hash: string;
  payload_round: number;
  proof_of_work_nonce: string;
  liquidity_baking_toggle_vote: string;
  adaptive_issuance_vote: string;
  signature: string;
};

export const parseHeader = async (
  header: Header | undefined
): Promise<Header> => {
  if (!header) {
    throw new Error("Header is empty");
  }

  return header;
};

/**
 * Retrieves the header from the Tezos chain.
 * @returns A Promise that resolves to an object representing the header.
 */
export const getHeader = function (
  rpcUrl: string,
  headers: Record<string, string>,
  pinnedCertificate: string
): Promise<Header> {
  return new Promise((resolve, reject) => {
    const headerUrl = `${rpcUrl}chains/main/blocks/head/header`;

    httpGET(
      headerUrl,
      headers,
      (response: string, certificate: string) => {
        if (pinnedCertificate !== certificate) {
          return reject(
            `Invalid certificate for "${rpcUrl}", got "${certificate}"`
          );
        }

        const parsed: Header = JSON.parse(response);

        resolve(parseHeader(parsed));
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};
