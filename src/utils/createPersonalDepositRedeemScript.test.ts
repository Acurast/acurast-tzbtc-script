import { createPersonalDepositRedeemScript } from "./createPersonalDepositRedeemScript";

describe("createRedeemScript", () => {
  it("is a dummy test", () => {});

  it("should create the redeem script correctly", () => {
    const targetRecipientHex =
      "06a1a1766b1cd9b5f410add01fc549c53b87c421181388a64d8e63";
    const gatekeeper1PublicKeyHex =
      "033f82f570bb3f99c627f1c4fe1e1cc339a7aded9cbebd102d80d974fc162c137e";
    const gatekeeper2PublicKeyHex =
      "038dd0da88bba0ac1c5c99a1c672046bff191735332a5361dcd490aaa066a749a3";
    const backupPublicKeyHex =
      "03b0ad437ff51cfbeff9320308cf6bb2453a89cc31375b171bcec26719e7467dec";

    const expectedRedeemScriptHex =
      "5121020b6a924d37ae40c3a3fd5c3bbd7ec0432782798f39790a08817c008bce9e355021033f82f570bb3f99c627f1c4fe1e1cc339a7aded9cbebd102d80d974fc162c137e21038dd0da88bba0ac1c5c99a1c672046bff191735332a5361dcd490aaa066a749a32103b0ad437ff51cfbeff9320308cf6bb2453a89cc31375b171bcec26719e7467dec54ae";

    const result = createPersonalDepositRedeemScript(
      targetRecipientHex,
      gatekeeper1PublicKeyHex,
      gatekeeper2PublicKeyHex,
      backupPublicKeyHex
    );

    expect(result).toEqual(expectedRedeemScriptHex);
  });

  it("should create the redeem script correctly 2", () => {
    const targetRecipientHex =
      "06a19f1104875964f51eec4acefe9c226d5df1a99cefaff4071889";
    const gatekeeper1PublicKeyHex =
      "033b84815035ab852b9edf11759cc4f63443478354d4237386612a1511b76e3bd2";
    const gatekeeper2PublicKeyHex =
      "027f523c52aa5ce6d10fa373beb807060c7103c3a90f303a9d31c45b1a063bec7e";
    const backupPublicKeyHex =
      "03b0ad437ff51cfbeff9320308cf6bb2453a89cc31375b171bcec26719e7467dec";

    const expectedRedeemScriptHex =
      "5121027f523c52aa5ce6d10fa373beb807060c7103c3a90f303a9d31c45b1a063bec7e210319fde8a2230da77bbd897b3c4c79554055262da3d110a9ca9f980222e11b35db21033b84815035ab852b9edf11759cc4f63443478354d4237386612a1511b76e3bd22103b0ad437ff51cfbeff9320308cf6bb2453a89cc31375b171bcec26719e7467dec54ae";

    const result = createPersonalDepositRedeemScript(
      targetRecipientHex,
      gatekeeper1PublicKeyHex,
      gatekeeper2PublicKeyHex,
      backupPublicKeyHex
    );

    expect(result).toEqual(expectedRedeemScriptHex);
  });
});
