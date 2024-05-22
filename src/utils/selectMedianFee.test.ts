import { BtcRpcResponse, selectMedianFee } from "./selectMedianFee";

describe("selectMedianFee", () => {
  it("should return the median fee when there are successful responses", async () => {
    const responses: {
      status: "fulfilled";
      value: BtcRpcResponse;
    }[] = [
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00014181,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00122472,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00122473,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00122473,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00122473,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
    ];
    const numberOfRequests = 5;
    const minSuccessResponses = 3;
    const expectedMedianFee = 0.00122473;

    const result = await selectMedianFee(
      responses,
      numberOfRequests,
      minSuccessResponses
    );

    expect(result).toEqual(expectedMedianFee);
  });

  it("should throw an error when there are no responses from nodes", async () => {
    const responses: PromiseSettledResult<BtcRpcResponse>[] = [];
    const numberOfRequests = 3;
    const minSuccessResponses = 2;

    await expect(
      selectMedianFee(responses, numberOfRequests, minSuccessResponses)
    ).rejects.toThrow("No responses from nodes");
  });

  it("should throw an error when all responses are rejected", async () => {
    const responses: {
      status: "rejected";
      reason: any;
    }[] = [
      { status: "rejected", reason: new Error("Request failed") },
      { status: "rejected", reason: new Error("Request failed") },
    ];
    const numberOfRequests = 3;
    const minSuccessResponses = 2;

    await expect(
      selectMedianFee(responses, numberOfRequests, minSuccessResponses)
    ).rejects.toThrow("Request failed");
  });

  it("should throw an error when there are too many failed requests", async () => {
    const responses: (
      | {
          status: "fulfilled";
          value: BtcRpcResponse;
        }
      | {
          status: "rejected";
          reason: any;
        }
    )[] = [
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00122473,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      { status: "rejected", reason: new Error("Request failed") },
      { status: "rejected", reason: new Error("Request failed") },
    ];
    const numberOfRequests = 3;
    const minSuccessResponses = 2;

    await expect(
      selectMedianFee(responses, numberOfRequests, minSuccessResponses)
    ).rejects.toThrow(
      "Too many failed requests (tried 3, got 2 failures, minimum successes required: 2)"
    );
  });

  it("should return the fee when there is only one successful response", async () => {
    const responses: {
      status: "fulfilled";
      value: BtcRpcResponse;
    }[] = [
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.00122473,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
    ];

    const numberOfRequests = 1;
    const minSuccessResponses = 1;
    const expectedFee = 0.00122473;

    const result = await selectMedianFee(
      responses,
      numberOfRequests,
      minSuccessResponses
    );

    expect(result).toEqual(expectedFee);
  });

  it("should return the median fee when there are successful responses with decimal values", async () => {
    const responses: {
      status: "fulfilled";
      value: BtcRpcResponse;
    }[] = [
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.001,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.002,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
      {
        status: "fulfilled",
        value: {
          result: {
            feerate: 0.003,
            blocks: 6,
          },
          error: null,
          id: "curltest",
        },
      },
    ];
    const numberOfRequests = 3;
    const minSuccessResponses = 2;
    const expectedMedianFee = 0.002;

    const result = await selectMedianFee(
      responses,
      numberOfRequests,
      minSuccessResponses
    );

    expect(result).toEqual(expectedMedianFee);
  });
});
