/**
 * Converts a number to a Uint8 buffer.
 *
 * @param num - The number to convert.
 * @returns The Uint8 buffer representing the number.
 */
export const numberToUint8 = function (num: number): Buffer {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(num);
  return buffer;
};
