import { base58DecodeCheck } from "./base58DecodeCheck";
import { bech32Decode } from "./bech32Decode";
import { bufferToVarSliceHex } from "./bufferToVarSliceHex";
import { hexToVarSliceHex } from "./hexToVarSliceHex";

/**
 * Converts an address to its hexadecimal representation.
 *
 * @param recipient - The address to convert.
 * @returns The hexadecimal representation of the address.
 */
export const recipientToBytesHex = function (recipient: string): string {
  const OP_0 = "00";
  const OP_1 = "51";
  const OP_DUP = "76";
  const OP_HASH160 = "a9";
  const OP_EQUAL = "87";
  const OP_EQUALVERIFY = "88";
  const OP_CHECKSIG = "ac";
  try {
    const { version, payload } = bech32Decode(recipient, "bech32m");

    if (version !== 1) {
      throw new Error(
        "bech32m address (taproot) cannot have non 1 version for us"
      );
    }
    return hexToVarSliceHex(`${OP_1}${bufferToVarSliceHex(payload)}`);
  } catch {
    try {
      const { version, payload } = bech32Decode(recipient, "bech32");

      if (version !== 0) {
        throw new Error("bech32 address (segwit) cannot have non 0 version");
      }

      return hexToVarSliceHex(`${OP_0}${bufferToVarSliceHex(payload)}`);
    } catch {
      const { version, payload } = base58DecodeCheck(recipient);

      if (version == 0 || version == 111) {
        // it's a p2pkh
        return hexToVarSliceHex(
          `${OP_DUP}${OP_HASH160}${bufferToVarSliceHex(
            payload
          )}${OP_EQUALVERIFY}${OP_CHECKSIG}`
        );
      } else if (version == 5 || version == 196) {
        // it's a p2sh
        return hexToVarSliceHex(
          `${OP_HASH160}${bufferToVarSliceHex(payload)}${OP_EQUAL}`
        );
      } else {
        throw new Error("unknown legacy address version");
      }
    }
  }
};

export const tryRecipientToBytesHex = (recipient: string): string => {
  try {
    return recipientToBytesHex(recipient);
  } catch {
    return recipient;
  }
};

// TODO: We now have a way to mock methods provided by the processor environment. We should convert the following test cases to unit tests.
// Test cases for address conversion
// We don't have unit tests because they rely on methods provided by the processor environment
//
// const addresses = [
//   {
//     address: "16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM",
//     // network: networks.bitcoin,
//     hex: "76a914010966776006953d5567439e5e39f86a0d273bee88ac",
//   },
//   {
//     address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
//     // network: networks.bitcoin,
//     hex: "76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac",
//   },
//   {
//     address: "12higDjoCCNXSA95xZMWUdPvXNmkAduhWv",
//     // network: networks.bitcoin,
//     hex: "76a91412ab8dc588ca9d5787dde7eb29569da63c3a238c88ac",
//   },
//   {
//     address: "342ftSRCvFHfCeFFBuz4xwbeqnDw6BGUey",
//     // network: networks.bitcoin,
//     hex: "a91419a7d869032368fd1f1e26e5e73a4ad0e474960e87",
//   },
//   {
//     address: "bc1q34aq5drpuwy3wgl9lhup9892qp6svr8ldzyy7c",
//     // network: networks.bitcoin,
//     hex: "00148d7a0a3461e3891723e5fdf8129caa0075060cff",
//   },
//   {
//     address: "bc1qeklep85ntjz4605drds6aww9u0qr46qzrv5xswd35uhjuj8ahfcqgf6hak",
//     // network: networks.bitcoin,
//     hex: "0020cdbf909e935c855d3e8d1b61aeb9c5e3c03ae8021b286839b1a72f2e48fdba70",
//   },
//   {
//     address: "bc1pxwww0ct9ue7e8tdnlmug5m2tamfn7q06sahstg39ys4c9f3340qqxrdu9k",
//     // network: networks.bitcoin,
//     hex: "5120339ce7e165e67d93adb3fef88a6d4beed33f01fa876f05a225242b82a631abc0",
//   },
//   {
//     address: "2NAGTNJJ2XyaZUmGLmgvjWsrDjCpNAFzMT2",
//     // network: networks.testnet,
//     hex: "a914bab5b915c0586f3c463a5bc0dd84e8b37a69befe87",
//   },
//   {
//     address: "tb1qq90px94sv8dkwvl58zuhxjqzm5j6w2e5rhgltr",
//     // network: networks.testnet,
//     hex: "0014015e1316b061db6733f438b9734802dd25a72b34",
//   },
//   {
//     address: "tb1qd2c588rvgv65dut9tds2vw0rkh52d3zazqwx9x",
//     // network: networks.testnet,
//     hex: "00146ab1439c6c433546f1655b60a639e3b5e8a6c45d",
//   },
//   {
//     address: "tb1qlh7za589jwmlys8ggrt4h93r84qjewgqspmczztwqrv4gnjx07rqfqmmm7",
//     // network: networks.testnet,
//     hex: "0020fdfc2ed0e593b7f240e840d75b96233d412cb900807781096e00d9544e467f86",
//   },
//   {
//     address: "tb1qnmal4pmyr7n2utk809v20v5l88hznuc6q5trsysnrk659h5sxsyq2wysec",
//     // network: networks.testnet,
//     hex: "00209efbfa87641fa6ae2ec77958a7b29f39ee29f31a05163812131db542de903408",
//   },
//   {
//     address: "n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF",
//     // network: networks.testnet,
//     hex: "76a914fbff95b4e35aca918d26e157392ea1643a2dc28388ac",
//   },
//   {
//     address: "2N2GyQtkabuYAwMMV5u358eAEvkCwPa7o2e",
//     // network: networks.testnet,
//     hex: "a914630dcbfa906fe91d7dfd9dd608c9f582b244f2b287",
//   },
//   {
//     address: "2N3oefVeg6stiTb5Kh3ozCSkaqmx91FDbsm",
//     // network: networks.testnet,
//     hex: "a91473d32ac9e4330a071ee1b3a9ccf3997bdd4174d087",
//   },
// ];

// for (const address of addresses) {
//   const output = recipientToBytesHex(address.address);
//   const expected = `${toVarIntHex(address.hex.length / 2)}${address.hex}`;
//   console.log(
//     "output",
//     output === expected ? "✅" : "❌",
//     address.address,
//     output,
//     expected,
//     toVarIntHex(address.hex.length / 2)
//   );
// }
