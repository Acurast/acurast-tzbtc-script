const { createHash } = require("crypto");
const ecc = require("tiny-secp256k1");
const BIP32Factory = require("bip32");
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory.default(ecc);
const bs58check = require("bs58check");

const sha256 = (input: string): string => {
  return createHash("sha256").update(Buffer.from(input, "hex")).digest("hex");
};

const derivePublicKey = (xpub: string, derivationPath: string): string => {
  const node = bip32.fromBase58(xpub);

  const child = node.derivePath(derivationPath);

  return child.publicKey.toString("hex");
};

const base58CheckEncode = (str: string): string => {
  return bs58check.encode(Buffer.from(str, "hex"));
};

const notImplemented = () => {
  throw new Error("Not implemented");
};

const anyGlobal = global as any;

// Check if the nested global exists, if not define it
anyGlobal._STD_ = anyGlobal._STD_ || {};
anyGlobal._STD_.chains = anyGlobal._STD_.chains || {};
anyGlobal._STD_.chains.bitcoin = anyGlobal._STD_.chains.bitcoin || {};
anyGlobal._STD_.chains.bitcoin.signer =
  anyGlobal._STD_.chains.bitcoin.signer || {};
anyGlobal._STD_.chains.bitcoin.utils =
  anyGlobal._STD_.chains.bitcoin.utils || {};

// Define the mock function for sha256
anyGlobal._STD_.chains.bitcoin.signer.sha256 = sha256;

// Define the mock function for derivePublicKey
anyGlobal._STD_.chains.bitcoin.utils.derivePublicKey = derivePublicKey;

// Define the mock function for base58CheckEncode
anyGlobal._STD_.chains.bitcoin.utils.base58CheckEncode = base58CheckEncode;
