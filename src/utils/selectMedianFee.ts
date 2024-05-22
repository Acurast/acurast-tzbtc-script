import { median } from "./median";

export interface BtcRpcResponse {
  result: null | {
    feerate: number;
    blocks: number;
  };
  error: null | any;
  id: string;
}

/**
 * Selects the median of response from a list of promises based on certain criteria.
 *
 * @param responses - An array of PromiseSettledResult objects representing the responses from multiple requests.
 * @param numberOfRequests - The total number of requests made.
 * @param minSuccessResponses - The minimum number of sucesses.
 * @returns The selected response value.
 * @throws {Error} If there are no responses from nodes.
 * @throws {any} If all responses are rejected.
 * @throws {Error} If there are too many failed requests.
 * @throws {Error} If there are too many different elements in the responses.
 */
export const selectMedianFee = async (
  responses: PromiseSettledResult<BtcRpcResponse>[],
  numberOfRequests: number,
  minSuccessResponses: number
): Promise<number> => {
  if (responses.length === 0) {
    throw new Error("No responses from nodes");
  }

  const successResponses: PromiseFulfilledResult<BtcRpcResponse>[] =
    responses.filter(
      (response): response is PromiseFulfilledResult<BtcRpcResponse> =>
        response.status === "fulfilled"
    );

  {
    // For debugging purposes
    const errorResponses: PromiseRejectedResult[] = responses.filter(
      (response): response is PromiseRejectedResult =>
        response.status === "rejected"
    );
    successResponses.forEach((response, index) =>
      console.log("successResponse" + index, JSON.stringify(response))
    );
    errorResponses.forEach((response, index) =>
      console.log("errorResponse" + index, JSON.stringify(response))
    );
  }

  if (successResponses.length === 0) {
    throw (responses[0] as PromiseRejectedResult).reason;
  }

  if (successResponses.length < minSuccessResponses) {
    throw new Error(
      `Too many failed requests (tried ${numberOfRequests}, got ${
        numberOfRequests - successResponses.length
      } failures, minimum successes required: ${minSuccessResponses})`
    );
  }

  if (
    successResponses.length === 1 &&
    successResponses[0].value.result?.feerate
  ) {
    return successResponses[0].value.result.feerate;
  }

  const fees: number[] = successResponses
    .map((x) => x.value.result?.feerate)
    .filter((x): x is number => x !== null && x !== undefined);

  return median(fees);
};
