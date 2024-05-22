import { parseStorage } from "./getTzbtcLedgerContractStorage";

describe("parseStorage", () => {
  it("should throw an error if storage is empty", async () => {
    const storage = undefined;

    await expect(parseStorage(storage)).rejects.toThrow("Storage is empty");
  });

  // it("should parse the storage correctly", async () => {
  //   const storage = {
  //     prim: "Pair",
  //     args: [
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 prim: "Pair",
  //                 args: [
  //                   {
  //                     int: "411231",
  //                   },
  //                   {
  //                     int: "2",
  //                   },
  //                 ],
  //               },
  //               {
  //                 bytes:
  //                   "220020e9b9cbfc54a27686924cef5433971f1fa107d3eee02fc4c16aea139b716217ac",
  //               },
  //               {
  //                 int: "0",
  //               },
  //             ],
  //           },
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 int: "411232",
  //               },
  //               {
  //                 int: "411233",
  //               },
  //             ],
  //           },
  //           {
  //             bytes:
  //               "22002021d1476d93fb6911cb262479baf0d7b892983dd06830371e888bccb9cae542b1",
  //           },
  //           {
  //             int: "411234",
  //           },
  //           {
  //             int: "1000000",
  //           },
  //         ],
  //       },
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 int: "411235",
  //               },
  //               {
  //                 int: "250",
  //               },
  //             ],
  //           },
  //           {
  //             string: "KT1Po6kibK4gGGTNd9nd38N54kgiJYvzisxn",
  //           },
  //           {
  //             int: "0",
  //           },
  //           {
  //             int: "1",
  //           },
  //         ],
  //       },
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             string: "KT18jqS6maEXL8AWvc2x2bppHNRQNqPq8axP",
  //           },
  //           {
  //             string: "tz1YY1LvD6TFH4z74pvxPQXBjAKHE5tB5Q8f",
  //           },
  //         ],
  //       },
  //       {
  //         int: "411236",
  //       },
  //       {
  //         int: "411237",
  //       },
  //       {
  //         int: "411238",
  //       },
  //     ],
  //   };

  //   const expected = {
  //     gatekeeperWithdrawAddressHex:
  //       "220020e9b9cbfc54a27686924cef5433971f1fa107d3eee02fc4c16aea139b716217ac",
  //     custodyAddressHex:
  //       "22002021d1476d93fb6911cb262479baf0d7b892983dd06830371e888bccb9cae542b1",
  //     signatureThreshold: 1,
  //   };

  //   const result = await parseStorage(storage);

  //   expect(result).toEqual(expected);
  // });

  // it("should parse the older storage correctly", async () => {
  //   const storage = {
  //     prim: "Pair",
  //     args: [
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 prim: "Pair",
  //                 args: [
  //                   {
  //                     int: "412443",
  //                   },
  //                   {
  //                     int: "2",
  //                   },
  //                 ],
  //               },
  //               {
  //                 bytes:
  //                   "220020098092d4bb569269aff17f802a1adeca4bc76bb6262b635de46e1bf6e7762e94",
  //               },
  //               {
  //                 int: "0",
  //               },
  //             ],
  //           },
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 int: "412444",
  //               },
  //               {
  //                 int: "412445",
  //               },
  //             ],
  //           },
  //           {
  //             bytes:
  //               "220020f0360a5c58b91fbdcd5bb43458fcc7a2f6ef4f950c96091edbb9b852468e3099",
  //           },
  //           {
  //             int: "412446",
  //           },
  //           {
  //             int: "1000000",
  //           },
  //         ],
  //       },
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 int: "412447",
  //               },
  //               {
  //                 int: "250",
  //               },
  //             ],
  //           },
  //           {
  //             string: "tz1YZkgk9jfxcBTKWvaFTuh5fPxYEueQGDT8",
  //           },
  //           {
  //             int: "100",
  //           },
  //           {
  //             int: "1",
  //           },
  //         ],
  //       },
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             string: "KT18jqS6maEXL8AWvc2x2bppHNRQNqPq8axP",
  //           },
  //           {
  //             string: "tz1YZkgk9jfxcBTKWvaFTuh5fPxYEueQGDT8",
  //           },
  //         ],
  //       },
  //       {
  //         int: "412448",
  //       },
  //       {
  //         int: "412449",
  //       },
  //       {
  //         int: "412450",
  //       },
  //     ],
  //   };

  //   const expected = {
  //     gatekeeperWithdrawAddressHex:
  //       "220020098092d4bb569269aff17f802a1adeca4bc76bb6262b635de46e1bf6e7762e94",
  //     custodyAddressHex:
  //       "220020f0360a5c58b91fbdcd5bb43458fcc7a2f6ef4f950c96091edbb9b852468e3099",
  //     signatureThreshold: 1,
  //   };

  //   const result = await parseStorage(storage);

  //   expect(result).toEqual(expected);
  // });

  it("should parse the newest storage correctly", async () => {
    const storage = {
      prim: "Pair",
      args: [
        {
          prim: "Pair",
          args: [
            {
              prim: "Pair",
              args: [
                {
                  prim: "Pair",
                  args: [
                    {
                      int: "413574",
                    },
                    {
                      int: "2",
                    },
                  ],
                },
                {
                  bytes:
                    "220020098092d4bb569269aff17f802a1adeca4bc76bb6262b635de46e1bf6e7762e94",
                },
                {
                  int: "0",
                },
                {
                  int: "413575",
                },
              ],
            },
            {
              prim: "Pair",
              args: [
                {
                  int: "413576",
                },
                {
                  bytes:
                    "220020f0360a5c58b91fbdcd5bb43458fcc7a2f6ef4f950c96091edbb9b852468e3099",
                },
              ],
            },
            {
              int: "413577",
            },
            {
              int: "1000000",
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
              prim: "Pair",
              args: [
                {
                  int: "413578",
                },
                {
                  int: "250",
                },
              ],
            },
            {
              string: "KT1FurYKnbVBkQ17b2gbvqZi4XLXvxKpJXWv",
            },
            {
              int: "100",
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
              string: "KT1FurYKnbVBkQ17b2gbvqZi4XLXvxKpJXWv",
            },
            {
              string: "tz1YZkgk9jfxcBTKWvaFTuh5fPxYEueQGDT8",
            },
          ],
        },
        {
          int: "413579",
        },
        {
          int: "413580",
        },
        {
          int: "413581",
        },
      ],
    };

    const expected = {
      gatekeeperWithdrawAddressHex:
        "220020098092d4bb569269aff17f802a1adeca4bc76bb6262b635de46e1bf6e7762e94",
      custodyAddressHex:
        "220020f0360a5c58b91fbdcd5bb43458fcc7a2f6ef4f950c96091edbb9b852468e3099",
      signatureThreshold: 1,
    };

    const result = await parseStorage(storage);

    expect(result).toEqual(expected);
  });

  // it("should parse the storage correctly from old contract", async () => {
  //   const storage = {
  //     prim: "Pair",
  //     args: [
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 prim: "Pair",
  //                 args: [
  //                   {
  //                     int: "411159",
  //                   },
  //                   {
  //                     int: "2",
  //                   },
  //                 ],
  //               },
  //               {
  //                 bytes:
  //                   "220020098092d4bb569269aff17f802a1adeca4bc76bb6262b635de46e1bf6e7762e94",
  //               },
  //               {
  //                 int: "3",
  //               },
  //             ],
  //           },
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 int: "411160",
  //               },
  //               {
  //                 bytes:
  //                   "220020f0360a5c58b91fbdcd5bb43458fcc7a2f6ef4f950c96091edbb9b852468e3099",
  //               },
  //             ],
  //           },
  //           {
  //             int: "411161",
  //           },
  //           {
  //             int: "1000000",
  //           },
  //         ],
  //       },
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             prim: "Pair",
  //             args: [
  //               {
  //                 int: "411162",
  //               },
  //               {
  //                 int: "250",
  //               },
  //             ],
  //           },
  //           {
  //             int: "0",
  //           },
  //           {
  //             int: "1",
  //           },
  //         ],
  //       },
  //       {
  //         prim: "Pair",
  //         args: [
  //           {
  //             string: "KT18jqS6maEXL8AWvc2x2bppHNRQNqPq8axP",
  //           },
  //           {
  //             string: "tz1YY1LvD6TFH4z74pvxPQXBjAKHE5tB5Q8f",
  //           },
  //         ],
  //       },
  //       {
  //         int: "411163",
  //       },
  //       {
  //         int: "411164",
  //       },
  //       {
  //         int: "411165",
  //       },
  //     ],
  //   };

  //   const expected = {
  //     gatekeeperWithdrawAddressHex:
  //       "220020098092d4bb569269aff17f802a1adeca4bc76bb6262b635de46e1bf6e7762e94",
  //     custodyAddressHex:
  //       "220020f0360a5c58b91fbdcd5bb43458fcc7a2f6ef4f950c96091edbb9b852468e3099",
  //   };

  //   const result = await parseStorage(storage);

  //   expect(result).toEqual(expected);
  // });
});
