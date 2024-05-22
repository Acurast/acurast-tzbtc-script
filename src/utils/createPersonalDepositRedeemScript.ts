import { OP_CHECKMULTISIG, OP_1, OP_4 } from "../constants/constants";
import { hexToVarSliceHex } from "./hexToVarSliceHex";

declare const _STD_: any;

const sha256: (input: string) => string = _STD_.chains.bitcoin.signer.sha256;
const base58CheckEncode: (input: string) => string =
  _STD_.chains.bitcoin.utils.base58CheckEncode;
const derivePublicKey: (xpub: string, path: string) => string =
  _STD_.chains.bitcoin.utils.derivePublicKey;

/**
 * Creates a redeem script for 3 addresses.
 *
 * @param targetRecipientHex - The hexadecimal representation of the target recipient.
 * @param gatekeeper1PublicKeyHex - The hexadecimal representation of the gatekeeper1's public key.
 * @param gatekeeper2PublicKeyHex - The hexadecimal representation of the gatekeeper2's public key.
 * @param backupPublicKeyHex - The hexadecimal representation of the backup public key.
 * @returns The redeem script as a hexadecimal string.
 */
export function createPersonalDepositRedeemScript(
  targetRecipientHex: string,
  gatekeeper1PublicKeyHex: string,
  gatekeeper2PublicKeyHex: string,
  backupPublicKeyHex: string
): string {
  const targetRecipientPackageHash = sha256(`0001${targetRecipientHex}`);

  if (targetRecipientPackageHash.length !== 64) {
    throw new Error("Invalid target recipient hash length");
  }

  if (backupPublicKeyHex.length !== 66) {
    throw new Error("Invalid backup public key length");
  }

  // Construct the xPub that contains the target recipient hash
  const decodedXPub = [
    "0488B21E", // Version bytes
    "00", // Depth
    "00000000", // Fingerprint of parent
    "00000000", // Child number
    targetRecipientPackageHash, // Chain code (in this case, the target recipient hash)
    backupPublicKeyHex, // Public key
  ].join("");

  const extendedKeyWithRecipientHashHex = base58CheckEncode(decodedXPub);

  const derivedKeyWithRecipientHashHex = derivePublicKey(
    extendedKeyWithRecipientHashHex,
    "m/0/1"
  );

  const sortedPubKeys = [
    gatekeeper1PublicKeyHex,
    gatekeeper2PublicKeyHex,
    backupPublicKeyHex,
    derivedKeyWithRecipientHashHex,
  ]
    .sort((a, b) => a.localeCompare(b))
    .map((hex) => hexToVarSliceHex(hex));

  const redeemScriptHex = [
    OP_1,
    sortedPubKeys[0],
    sortedPubKeys[1],
    sortedPubKeys[2],
    sortedPubKeys[3],
    OP_4,
    OP_CHECKMULTISIG,
  ].join("");

  return redeemScriptHex;
}
