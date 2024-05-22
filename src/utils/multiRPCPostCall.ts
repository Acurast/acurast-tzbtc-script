import { bitcoinRPCPostCall } from "./bitcoinRPCPostCall";
import { selectMedianFee } from "./selectMedianFee";
import { selectResponse } from "./selectResponse";
import { RpcConfig } from "./types";

/**
 * Makes multiple RPC post calls to different configurations, checks if all responses are equal, and returns the response.
 *
 * @param method - The RPC method to call.
 * @param params - The parameters to pass to the RPC method.
 * @returns A Promise that resolves to the response from the RPC call.
 * @throws Error if there are too many failures or if the responses do not match.
 */
export const multiRPCPostCall = async function (
  nodes: RpcConfig[],
  minSuccessResponses: number,
  method: "getrawtransaction" | "sendrawtransaction" | "estimatesmartfee",
  params: any[]
) {
  const responses = await Promise.allSettled(
    nodes.map(async (node) => {
      return bitcoinRPCPostCall(
        node.url,
        node.port,
        node.headers,
        node.certificate,
        method,
        params
      );
    })
  );

  if (method === "estimatesmartfee") {
    return {
      result: {
        feerate: await selectMedianFee(
          responses,
          nodes.length,
          minSuccessResponses
        ),
        blocks: 6,
      },
      error: null,
      id: "curltest",
    };
  } else {
    return selectResponse(responses, nodes.length, minSuccessResponses);
  }
};
