import { median } from "./median";

describe("median", () => {
  it("should return the median of an array with odd length", () => {
    const values = [1, 3, 2, 5, 4];
    const expectedMedian = 3;

    const result = median(values);

    expect(result).toEqual(expectedMedian);
  });

  it("should return the median of an array with numbers with decimal points", () => {
    const values = [0.00014181, 0.00122472, 0.00122473, 0.00122473, 0.00122473];
    const expectedMedian = 0.00122473;

    const result = median(values);

    expect(result).toEqual(expectedMedian);
  });

  it("should return the median of an uneven array with numbers with decimal points", () => {
    const values = [0.00014181, 0.00122472, 0.00122473, 0.00122473];
    const expectedMedian = 0.001224725;

    const result = median(values);

    expect(result).toEqual(expectedMedian);
  });

  it("should return the median of an array with even length", () => {
    const values = [1, 3, 2, 5, 4, 6];
    const expectedMedian = 3.5;

    const result = median(values);

    expect(result).toEqual(expectedMedian);
  });

  it("should throw an error if the input array is empty", () => {
    const values: number[] = [];

    expect(() => median(values)).toThrow("Input array is empty");
  });

  it("should ignore non-numeric values in the input array", () => {
    const values = [1, 3, "2", 5, 4];
    const expectedMedian = 3.5;

    const result = median(values as any);

    expect(result).toEqual(expectedMedian);
  });

  it("should handle negative numbers in the input array", () => {
    const values = [-1, 3, 2, -5, 4];
    const expectedMedian = 2;

    const result = median(values);

    expect(result).toEqual(expectedMedian);
  });
});
