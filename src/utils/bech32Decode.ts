import { polymod } from "./polymod";
import { CHARSET } from "../constants/constants";
import { hrpExpand } from "./hrpExpand";

/**
 * Decodes a bech32 or bech32m string and returns the decoded data as a Buffer.
 *
 * @param bechString - The bech32 or bech32m string to decode.
 * @param encodingType - The encoding type, either "bech32" or "bech32m".
 * @returns The decoded data as a Buffer.
 * @throws {Error} If the string is invalid or the checksum is invalid.
 */
export const bech32Decode = function (
  bechString: string,
  encodingType: "bech32" | "bech32m"
): { version: number; payload: Buffer } {
  const pos: number = bechString.lastIndexOf("1");
  if (pos < 1 || pos + 7 > bechString.length || bechString.length > 90) {
    throw new Error("Invalid bech32(m) string");
  }
  const hrp: string = bechString.substring(0, pos);
  const dataChars: string[] = bechString.substring(pos + 1).split("");

  const data: number[] = dataChars.map((char) => {
    const index: number = CHARSET.indexOf(char);
    if (index === -1) {
      throw new Error("Invalid character in data portion");
    }
    return index;
  });

  const combined: number[] = hrpExpand(hrp).concat(data);
  const checksumConstant: number =
    encodingType === "bech32m" ? 0x2bc830a3 : 0x01; // Bech32 checksum constant is 0x01, Bech32m is 0x2bc830a3
  if (polymod(combined) !== checksumConstant) {
    throw new Error("Invalid checksum");
  }

  const version = data[0];
  const decodedData: number[] = data.slice(1, -6); // Remove checksum

  // Convert from 5-bit array to bytes
  let buffer: Buffer = Buffer.alloc((decodedData.length * 5) >> 3);
  let bufferIndex: number = 0;
  let accumulator: number = 0;
  let bits: number = 0;
  for (let value of decodedData) {
    accumulator = (accumulator << 5) | value;
    bits += 5;
    if (bits >= 8) {
      buffer[bufferIndex++] = (accumulator >> (bits - 8)) & 0xff;
      bits -= 8;
    }
  }
  return { version, payload: buffer };
};
