import { compareElements } from "./compareElements";

describe("compareElements", () => {
  it("should return the correct maxKey and maxValue", () => {
    const array = ["a", "b", "c", "b", "a", "c", "c"];

    const result = compareElements(array);

    expect(result.maxKey).toBe(2);
    expect(result.maxValue).toBe(3);
  });

  it("should return -1 for maxKey and maxValue when array is empty", () => {
    const array: any[] = [];

    const result = compareElements(array);

    expect(result.maxKey).toBe(-1);
    expect(result.maxValue).toBe(-1);
  });

  // Add more test cases if needed
});
