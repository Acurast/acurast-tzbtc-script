/**
 * The OP_DROP constant represents the opcode value for the "drop" operation.
 */
export const OP_DROP = "75";
export const OP_CHECKMULTISIG = "ae";
export const OP_1 = "51";
export const OP_2 = "52";
export const OP_3 = "53";
export const OP_4 = "54";

export const MUSIG_OP_NUM_MAP: {
  [key: string]: any;
} = {
  1: "51",
  2: "52",
  3: "53",
  4: "54",
  5: "55",
  6: "56",
  7: "57",
  8: "58",
  9: "59",
  10: "5a",
  11: "5b",
  12: "5c",
  13: "5d",
  14: "5e",
  15: "5f",
  16: "60",
};
export const SEQUENCE_BYTES = Buffer.from("ffffffff", "hex"); // sequence is hardcoded, don't allow replace by fee
export const LOCKTIME_BYTES = Buffer.from("00000000", "hex"); // locktime is hardcoded, don't hold back TX

/**
 * Address Encoding/Decoding used to decode the recipient of an output
 */
export const POLYMOD_GENERATORS: number[] = [
  0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3,
];
export const CHARSET: string = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
