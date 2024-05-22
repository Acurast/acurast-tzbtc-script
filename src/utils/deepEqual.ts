/**
 * Checks if two objects are deeply equal.
 *
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns `true` if the objects are deeply equal, `false` otherwise.
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (
    typeof obj1 === "string" ||
    typeof obj1 === "number" ||
    typeof obj1 === "boolean" ||
    typeof obj1 === "bigint" ||
    typeof obj1 === "symbol" ||
    typeof obj1 === "undefined" ||
    typeof obj1 === "function"
  ) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the given value is an object.
 *
 * @param object - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export function isObject(object: any): boolean {
  return object != null && typeof object === "object";
}
