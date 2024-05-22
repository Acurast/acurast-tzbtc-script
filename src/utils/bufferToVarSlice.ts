import { toVarInt } from "./toVarInt";

/**
 * Converts a buffer to a variable-length slice.
 *
 * @param payload - The buffer to convert.
 * @returns The variable-length slice.
 */
export const bufferToVarSlice = function (payload: Buffer): Buffer {
  return Buffer.concat([toVarInt(payload.length), payload]);
};
