import { bufferToVarSlice } from "./bufferToVarSlice";

/**
 * Converts a hex string to a variable-length slice.
 *
 * @param payload - The hex string to convert.
 * @returns The variable-length slice in hex.
 */
export const hexToVarSliceHex = function (payload: string): string {
  const buffer = Buffer.from(payload, "hex");
  return bufferToVarSlice(buffer).toString("hex");
};
