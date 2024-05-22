import { bufferToVarSlice } from "./bufferToVarSlice";

/**
 * Converts a buffer to a variable-length slice.
 *
 * @param payload - The buffer to convert.
 * @returns The variable-length slice in hex.
 */
export const bufferToVarSliceHex = function (payload: Buffer): string {
  return bufferToVarSlice(payload).toString("hex");
};
