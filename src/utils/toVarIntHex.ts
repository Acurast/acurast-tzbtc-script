/**
 * Converts a number to a variable-length hexadecimal string representation.
 *
 * @param value - The number to convert.
 * @returns The hexadecimal string representation of the number.
 * @throws Error if the value is greater than 252 because it's only implemented for smaller numbers.
 */
export const toVarIntHex = function (value: number): string {
  const buffer = Buffer.alloc(8);
  buffer.writeBigInt64LE(BigInt(value));

  if (value <= 252) {
    return buffer.subarray(0, 1).toString("hex");
  } else if (value <= 0xffff) {
    // Up to 65535
    return "fd" + buffer.subarray(0, 2).toString("hex");
  } else if (value <= 0xffffffff) {
    // Up to 4294967295
    return "fe" + buffer.subarray(0, 4).toString("hex");
  } else if (value <= Number.MAX_SAFE_INTEGER) {
    // Up to 9007199254740991
    return "ff" + buffer.subarray(0, 8).toString("hex");
  } else {
    throw new Error("Number too large or not safe in JavaScript");
  }
};
