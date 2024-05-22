import { parseHeader } from "./getHeader";

describe("parseHeader", () => {
  it("should throw an error if header is empty", async () => {
    const header = undefined;

    await expect(parseHeader(header)).rejects.toThrow("Header is empty");
  });

  it("should handle a map without signatures", async () => {
    const header = {
      protocol: "ProxfordYmVfjWnRcgjWH36fW6PArwqykTFzotUxRs6gmTcZDuH",
      chain_id: "NetXnHfVqm9iesp",
      hash: "BL2CZ2uMKdXBPsF2cVW7w3b8AryQoqSeaS7tDNrRoHHg4hRmb2j",
      level: 5876825,
      proto: 8,
      predecessor: "BMPAhXc7ay4cN7nMtL2cjS7agiw8sMN5zufZYrMqRB2su29fSjt",
      timestamp: "2024-04-02T10:13:17Z",
      validation_pass: 4,
      operations_hash: "LLoamv3fqAPXk5pu5CxfdrhgUXr2bNuS9KAHduDupC3sAqw7gBTwC",
      fitness: ["02", "0059ac59", "", "ffffffff", "00000000"],
      context: "CoVJ7WpP23Ttxrc4yXJVMX21tWSCUAYmbRNHw4aES74yFg1a1q2p",
      payload_hash: "vh2eKFzwZEzKDSoXpeFhv9w468axNHKjXX79Sn2wJnHssfE5GBw2",
      payload_round: 0,
      proof_of_work_nonce: "10b119fe327e0000",
      liquidity_baking_toggle_vote: "pass",
      adaptive_issuance_vote: "pass",
      signature:
        "sigqUcE2RH4dS9QMyG7T6RmiMMYrmVVnLyDRC8zgRmjnDBUq9RgxKA2qUEQi5ZZKujJzFqGmMQnjFCQDuKCvHHz2LSP5DnTj",
    };

    const result = await parseHeader(header);

    expect(result).toStrictEqual({
      protocol: "ProxfordYmVfjWnRcgjWH36fW6PArwqykTFzotUxRs6gmTcZDuH",
      chain_id: "NetXnHfVqm9iesp",
      hash: "BL2CZ2uMKdXBPsF2cVW7w3b8AryQoqSeaS7tDNrRoHHg4hRmb2j",
      level: 5876825,
      proto: 8,
      predecessor: "BMPAhXc7ay4cN7nMtL2cjS7agiw8sMN5zufZYrMqRB2su29fSjt",
      timestamp: "2024-04-02T10:13:17Z",
      validation_pass: 4,
      operations_hash: "LLoamv3fqAPXk5pu5CxfdrhgUXr2bNuS9KAHduDupC3sAqw7gBTwC",
      fitness: ["02", "0059ac59", "", "ffffffff", "00000000"],
      context: "CoVJ7WpP23Ttxrc4yXJVMX21tWSCUAYmbRNHw4aES74yFg1a1q2p",
      payload_hash: "vh2eKFzwZEzKDSoXpeFhv9w468axNHKjXX79Sn2wJnHssfE5GBw2",
      payload_round: 0,
      proof_of_work_nonce: "10b119fe327e0000",
      liquidity_baking_toggle_vote: "pass",
      adaptive_issuance_vote: "pass",
      signature:
        "sigqUcE2RH4dS9QMyG7T6RmiMMYrmVVnLyDRC8zgRmjnDBUq9RgxKA2qUEQi5ZZKujJzFqGmMQnjFCQDuKCvHHz2LSP5DnTj",
    });
  });
});
