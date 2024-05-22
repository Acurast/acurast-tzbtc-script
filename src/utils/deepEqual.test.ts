import { deepEqual } from "./deepEqual";

describe("deepEqual", () => {
  it("should return true for equal objects", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2, c: { d: 3 } };

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(true);
  });

  it("should return true for equal objects with arrays", () => {
    const obj1 = { a: true, b: [{ x: 2 }, 3], c: { d: "3" } };
    const obj2 = { a: true, b: [{ x: 2 }, 3], c: { d: "3" } };

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(true);
  });

  it("should return false for unequal objects", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2, c: { d: 4 } };

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(false);
  });

  it("should return false for objects with different keys", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2, c: 3 };

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(false);
  });

  it("should return true for empty objects", () => {
    const obj1 = {};
    const obj2 = {};

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(true);
  });

  it("should return true for strings", () => {
    const obj1 = "test";
    const obj2 = "test";

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(true);
  });

  it("should return false for unequal strings", () => {
    const obj1 = "test1";
    const obj2 = "test2";

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(false);
  });

  it("should return true for equal booleans", () => {
    const obj1 = true;
    const obj2 = true;

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(true);
  });

  it("should return false for unequal booleans", () => {
    const obj1 = true;
    const obj2 = false;

    const result = deepEqual(obj1, obj2);

    expect(result).toBe(false);
  });
});
