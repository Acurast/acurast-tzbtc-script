/**
 * Converts a number to a Uint32 buffer.
 *
 * @param num - The number to convert.
 * @returns The Uint32 buffer.
 */
export const numberToUint32 = function (num: number): Buffer {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(num);
  return buffer;
};
