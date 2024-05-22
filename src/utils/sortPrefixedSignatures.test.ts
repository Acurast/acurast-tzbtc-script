import { sortPrefixedSignatures } from "./sortPrefixedSignatures";

describe("sortPrefixedSignatures", () => {
  it("should sort prefixed signatures by public key lexicographically", () => {
    const prefixedSignatureSet = [
      ["02defa01aa", "02cbda01bb", "02abcd01cc", "02ffff01dd"],
    ];

    const expectedSortedSignatures = [["01cc", "01bb", "01aa", "01dd"]];

    const result = sortPrefixedSignatures(prefixedSignatureSet);

    expect(result).toEqual(expectedSortedSignatures);
  });

  it("should throw an error if prefixed signature is not in expected format", () => {
    const prefixedSignatureSet = [
      ["02defa01aa", "02cbda01bb", "02abcd01cc", "0000invalid"],
    ];
    expect(() => sortPrefixedSignatures(prefixedSignatureSet)).toThrowError(
      "Prefixed Signature is not in expected format"
    );
  });
});
