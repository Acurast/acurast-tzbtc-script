import { Root, parseBurnMap } from "./getBurnMap";

describe("parseBurnMap", () => {
  it("should throw an error if burnMap is empty", async () => {
    const burnMap = undefined;

    await expect(parseBurnMap(burnMap)).rejects.toThrow("Burn map is empty");
  });

  it("should handle a map without signatures", async () => {
    const burnMap: Root = {
      prim: "Pair",
      args: [
        {
          string: "tz2LqjxyuB43QGadnMbWxSKoJSVWyje8cwrQ",
        },
        {
          string: "...",
        },
        {
          int: "2000",
        },
        {
          int: "1",
        },
        {
          int: "200",
        },
        [
          {
            prim: "Elt",
            args: [
              {
                prim: "Pair",
                args: [
                  {
                    bytes:
                      "27c6242dbe026a3a4440f6f6ac155c5a315096135ba67230c3fb7ffb3f9d8d0d",
                  },
                  {
                    int: "0",
                  },
                ],
              },
              {
                prim: "Pair",
                args: [
                  {
                    int: "9800",
                  },
                  [],
                ],
              },
            ],
          },
        ],
      ],
    };

    const result = await parseBurnMap(burnMap);

    expect(result).toStrictEqual({
      amount: 2000,
      fee: 200,
      proposer: "tz2LqjxyuB43QGadnMbWxSKoJSVWyje8cwrQ",
      receiver: "...",
      state: 1,
      utxo: [
        {
          amount: 9800,
          txId: "27c6242dbe026a3a4440f6f6ac155c5a315096135ba67230c3fb7ffb3f9d8d0d",
          outputNo: 0,
          prefixedSignatures: [],
        },
      ],
    });
  });

  it("should parse a map with signatures", async () => {
    const burnMap: Root = {
      prim: "Pair",
      args: [
        {
          string: "tz2LqjxyuB43QGadnMbWxSKoJSVWyje8cwrQ",
        },
        {
          string: "...",
        },
        {
          int: "2000",
        },
        {
          int: "1",
        },
        {
          int: "200",
        },
        [
          {
            prim: "Elt",
            args: [
              {
                prim: "Pair",
                args: [
                  {
                    bytes:
                      "27c6242dbe026a3a4440f6f6ac155c5a315096135ba67230c3fb7ffb3f9d8d0d",
                  },
                  {
                    int: "0",
                  },
                ],
              },
              {
                prim: "Pair",
                args: [
                  {
                    int: "9800",
                  },
                  [
                    {
                      prim: "Elt",
                      args: [
                        {
                          string: "tz3ekishqwvwD3TcWqKr69VH6hPPSGSgGZzW",
                        },
                        {
                          bytes:
                            "4730440220716106149626768315cd231aea8587f02a3dccd1a2be8ac8fbb1d7c705a1c5e502201adfef4c09a8f9211fb8b11c495ae55bd861b3f225a72dc90cecc9b5208d0c5201",
                        },
                      ],
                    },
                  ],
                ],
              },
            ],
          },
        ],
      ],
    };
    const result = await parseBurnMap(burnMap);

    expect(result).toStrictEqual({
      amount: 2000,
      fee: 200,
      proposer: "tz2LqjxyuB43QGadnMbWxSKoJSVWyje8cwrQ",
      receiver: "...",
      state: 1,
      utxo: [
        {
          amount: 9800,
          txId: "27c6242dbe026a3a4440f6f6ac155c5a315096135ba67230c3fb7ffb3f9d8d0d",
          outputNo: 0,
          prefixedSignatures: [
            "4730440220716106149626768315cd231aea8587f02a3dccd1a2be8ac8fbb1d7c705a1c5e502201adfef4c09a8f9211fb8b11c495ae55bd861b3f225a72dc90cecc9b5208d0c5201",
          ],
        },
      ],
    });
  });

  it("should parse a map with multiple utxos and no signatures", async () => {
    const burnMap: Root = {
      prim: "Pair",
      args: [
        {
          string: "tz2K7NiHwxvfN4LuUQQa6Mc9LGc8xrH7rw9t",
        },
        {
          string: "...",
        },
        {
          int: "20000",
        },
        {
          int: "1",
        },
        {
          int: "800",
        },
        [
          {
            prim: "Elt",
            args: [
              {
                prim: "Pair",
                args: [
                  {
                    bytes:
                      "18a8508ac6beeb41f5782fa6bb5242f67b33d366096f9262e9e6c124859e2934",
                  },
                  {
                    int: "0",
                  },
                ],
              },
              {
                prim: "Pair",
                args: [
                  {
                    int: "29799",
                  },
                  [],
                ],
              },
            ],
          },
          {
            prim: "Elt",
            args: [
              {
                prim: "Pair",
                args: [
                  {
                    bytes:
                      "5a348999ab6e448c6520fdeff8b49d20040591b7b8689ed7981cb2740a32f578",
                  },
                  {
                    int: "1",
                  },
                ],
              },
              {
                prim: "Pair",
                args: [
                  {
                    int: "6800",
                  },
                  [],
                ],
              },
            ],
          },
        ],
      ],
    };

    const result = await parseBurnMap(burnMap);

    expect(result).toStrictEqual({
      amount: 20000,
      fee: 800,
      proposer: "tz2K7NiHwxvfN4LuUQQa6Mc9LGc8xrH7rw9t",
      receiver: "...",
      state: 1,
      utxo: [
        {
          amount: 29799,
          txId: "18a8508ac6beeb41f5782fa6bb5242f67b33d366096f9262e9e6c124859e2934",
          outputNo: 0,
          prefixedSignatures: [],
        },
        {
          amount: 6800,
          outputNo: 1,
          prefixedSignatures: [],
          txId: "5a348999ab6e448c6520fdeff8b49d20040591b7b8689ed7981cb2740a32f578",
        },
      ],
    });
  });

  it("should parse a map with multiple utxos and multiple signatures", async () => {
    const burnMap: Root = {
      prim: "Pair",
      args: [
        {
          string: "tz2K7NiHwxvfN4LuUQQa6Mc9LGc8xrH7rw9t",
        },
        {
          string: "...",
        },
        {
          int: "20000",
        },
        {
          int: "1",
        },
        {
          int: "800",
        },
        [
          {
            prim: "Elt",
            args: [
              {
                prim: "Pair",
                args: [
                  {
                    bytes:
                      "18a8508ac6beeb41f5782fa6bb5242f67b33d366096f9262e9e6c124859e2934",
                  },
                  {
                    int: "0",
                  },
                ],
              },
              {
                prim: "Pair",
                args: [
                  {
                    int: "29799",
                  },
                  [
                    {
                      prim: "Elt",
                      args: [
                        {
                          string: "tz1YZkgk9jfxcBTKWvaFTuh5fPxYEueQGDT8",
                        },
                        {
                          bytes:
                            "483045022100b50848412a477a57ac09d2ee6bb867980991e53994fe796fa6216d4dff9be27c022016d4f11e29b5940441b8ca8a1a8edd36a25a346b55426c3a3555cda10d842d1c01",
                        },
                      ],
                    },
                    {
                      prim: "Elt",
                      args: [
                        {
                          string: "tz3ekishqwvwD3TcWqKr69VH6hPPSGSgGZzW",
                        },
                        {
                          bytes:
                            "483045022100b50848412a477a57ac09d2ee6bb867980991e53994fe796fa6216d4dff9be27c022016d4f11e29b5940441b8ca8a1a8edd36a25a346b55426c3a3555cda10d842d1c01",
                        },
                      ],
                    },
                  ],
                ],
              },
            ],
          },
          {
            prim: "Elt",
            args: [
              {
                prim: "Pair",
                args: [
                  {
                    bytes:
                      "5a348999ab6e448c6520fdeff8b49d20040591b7b8689ed7981cb2740a32f578",
                  },
                  {
                    int: "1",
                  },
                ],
              },
              {
                prim: "Pair",
                args: [
                  {
                    int: "6800",
                  },
                  [
                    {
                      prim: "Elt",
                      args: [
                        {
                          string: "tz1YZkgk9jfxcBTKWvaFTuh5fPxYEueQGDT8",
                        },
                        {
                          bytes:
                            "48304502210080a4bc527d31d0d2a987d4d43ebd3c999653e87303b0a79545b24bbf2b4eadcd02206834dcd0d5ced9985f6990c3f52433da7d01715ed4e7c6afee4fecbf2dfba35c01",
                        },
                      ],
                    },
                    {
                      prim: "Elt",
                      args: [
                        {
                          string: "tz3ekishqwvwD3TcWqKr69VH6hPPSGSgGZzW",
                        },
                        {
                          bytes:
                            "48304502210080a4bc527d31d0d2a987d4d43ebd3c999653e87303b0a79545b24bbf2b4eadcd02206834dcd0d5ced9985f6990c3f52433da7d01715ed4e7c6afee4fecbf2dfba35c01",
                        },
                      ],
                    },
                  ],
                ],
              },
            ],
          },
        ],
      ],
    };

    const result = await parseBurnMap(burnMap);

    expect(result).toStrictEqual({
      amount: 20000,
      fee: 800,
      proposer: "tz2K7NiHwxvfN4LuUQQa6Mc9LGc8xrH7rw9t",
      receiver: "...",
      state: 1,
      utxo: [
        {
          amount: 29799,
          txId: "18a8508ac6beeb41f5782fa6bb5242f67b33d366096f9262e9e6c124859e2934",
          outputNo: 0,
          prefixedSignatures: [
            "483045022100b50848412a477a57ac09d2ee6bb867980991e53994fe796fa6216d4dff9be27c022016d4f11e29b5940441b8ca8a1a8edd36a25a346b55426c3a3555cda10d842d1c01",
            "483045022100b50848412a477a57ac09d2ee6bb867980991e53994fe796fa6216d4dff9be27c022016d4f11e29b5940441b8ca8a1a8edd36a25a346b55426c3a3555cda10d842d1c01",
          ],
        },
        {
          amount: 6800,
          outputNo: 1,
          prefixedSignatures: [
            "48304502210080a4bc527d31d0d2a987d4d43ebd3c999653e87303b0a79545b24bbf2b4eadcd02206834dcd0d5ced9985f6990c3f52433da7d01715ed4e7c6afee4fecbf2dfba35c01",
            "48304502210080a4bc527d31d0d2a987d4d43ebd3c999653e87303b0a79545b24bbf2b4eadcd02206834dcd0d5ced9985f6990c3f52433da7d01715ed4e7c6afee4fecbf2dfba35c01",
          ],
          txId: "5a348999ab6e448c6520fdeff8b49d20040591b7b8689ed7981cb2740a32f578",
        },
      ],
    });
  });
});
