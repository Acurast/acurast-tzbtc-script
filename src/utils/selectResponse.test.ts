import { selectResponse } from "./selectResponse";

describe("selectResponse", () => {
  it("should throw an error if there are no responses from nodes", () => {
    const responses: PromiseSettledResult<any>[] = [];
    const numberOfRequests = 0;
    const minSuccessResponses = 1;

    expect(() =>
      selectResponse(responses, numberOfRequests, minSuccessResponses)
    ).toThrowError("No responses from nodes");
  });

  it("should throw an error if all responses are failed", () => {
    const responses: PromiseSettledResult<any>[] = [
      { status: "rejected", reason: new Error("Failed response") },
      { status: "rejected", reason: new Error("Failed response") },
    ];
    const numberOfRequests = 2;
    const minSuccessResponses = 1;

    expect(() =>
      selectResponse(responses, numberOfRequests, minSuccessResponses)
    ).toThrowError("Failed response");
  });

  it("should throw an error if there are too many failed requests", () => {
    const responses: PromiseSettledResult<any>[] = [
      { status: "fulfilled", value: "Response 1" },
      { status: "rejected", reason: new Error("Failed response") },
      { status: "rejected", reason: new Error("Failed response") },
    ];
    const numberOfRequests = 3;
    const minSuccessResponses = 2;

    expect(() =>
      selectResponse(responses, numberOfRequests, minSuccessResponses)
    ).toThrowError(
      "Too many failed requests (tried 3, got 2 failures, minimum successes required: 2)"
    );
  });

  it("should return the value if there is only one successful response", async () => {
    const responses: PromiseSettledResult<any>[] = [
      { status: "fulfilled", value: "Response 1" },
    ];
    const numberOfRequests = 1;
    const minSuccessResponses = 1;

    try {
      const result = await selectResponse(
        responses,
        numberOfRequests,
        minSuccessResponses
      );
      expect(result).toEqual("Response 1");
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  it("should return the value with the highest occurrence if multiple successful responses", async () => {
    const responses: PromiseSettledResult<string>[] = [
      { status: "fulfilled", value: "Response 1" },
      { status: "fulfilled", value: "Response 2" },
      { status: "fulfilled", value: "Response 1" },
      { status: "fulfilled", value: "Response 3" },
    ];
    const numberOfRequests = 4;
    const minSuccessResponses = 2;

    try {
      const result = await selectResponse(
        responses,
        numberOfRequests,
        minSuccessResponses
      );
      expect(result).toEqual("Response 1");
    } catch (e) {
      expect(true).toEqual(false);
    }
  });

  it("should throw an error if there are too many different elements", () => {
    const responses: PromiseSettledResult<any>[] = [
      { status: "fulfilled", value: "Response 1" },
      { status: "fulfilled", value: "Response 2" },
      { status: "fulfilled", value: "Response 3" },
    ];
    const numberOfRequests = 3;
    const minSuccessResponses = 2;

    expect(() =>
      selectResponse(responses, numberOfRequests, minSuccessResponses)
    ).toThrowError("Too many different elements");
  });
});
