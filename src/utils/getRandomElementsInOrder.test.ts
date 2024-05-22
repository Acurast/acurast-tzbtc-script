import { getRandomElementsInOrder } from "./getRandomElementsInOrder";

describe("getRandomElementsInOrder", () => {
  it("should return an empty array when given an empty array", () => {
    const array: number[] = [];
    const n = 3;

    const result = getRandomElementsInOrder(array, n);

    expect(result).toEqual([]);
  });

  it("should return the entire array when n is equal to the array length", () => {
    const array = [1, 2, 3, 4, 5];
    const n = array.length;

    const result = getRandomElementsInOrder(array, n);

    expect(result).toEqual(array);
  });

  it("should return an array with n elements in the original order", () => {
    const array = [1, 2, 3, 4, 5];
    const n = 3;

    const result = getRandomElementsInOrder(array, n);

    expect(result.length).toEqual(n);
    expect(array).toContain(result[0]);
    expect(array).toContain(result[1]);
    expect(array).toContain(result[2]);
  });

  it("should return an array with unique elements", () => {
    const array = [1, 2, 3, 4, 5];
    const n = 4;

    const result = getRandomElementsInOrder(array, n);

    expect(result.length).toEqual(n);
    expect(new Set(result).size).toEqual(n);
  });

  it("should return an empty array when n is 0", () => {
    const array = [1, 2, 3, 4, 5];
    const n = 0;

    const result = getRandomElementsInOrder(array, n);

    expect(result).toEqual([]);
  });

  it("should return an empty array when n is negative", () => {
    const array = [1, 2, 3, 4, 5];
    const n = -2;

    const result = getRandomElementsInOrder(array, n);

    expect(result).toEqual([]);
  });

  it("should return the first n elements in the original order", () => {
    const array = [1, 2, 3, 4, 5];
    const n = 3;

    const result = getRandomElementsInOrder(array, n);

    expect(result.length).toEqual(n);
    expect(array.indexOf(result[0])).toBeLessThan(array.indexOf(result[1]));
    expect(array.indexOf(result[1])).toBeLessThan(array.indexOf(result[2]));
  });
});
