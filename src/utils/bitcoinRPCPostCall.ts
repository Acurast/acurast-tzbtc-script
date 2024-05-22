declare const httpPOST: any;

export const bitcoinRPCPostCall = function (
  hostname: string,
  _port: number,
  headers: { [key: string]: string },
  pinnedCertificate: string,
  method: string,
  params: any[]
): Promise<
  | {
      result: any;
      error: null;
      id: "curltest";
    }
  | {
      result: null;
      error: { code: -27; message: "Transaction already in block chain" };
      id: "curltest";
    }
  | {
      result: null;
      error: { code: -25; message: "bad-txns-inputs-missingorspent" };
      id: "curltest";
    }
> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      jsonrpc: "1.0",
      id: "curltest",
      method: method,
      params: params,
    });

    const newHeaders = {
      ...headers,
      "Content-Type": "application/json",
    };

    httpPOST(
      hostname,
      payload,
      newHeaders,
      (response: any, certificate: string) => {
        if (pinnedCertificate !== certificate) {
          return reject(
            `Invalid certificate for "${hostname}", got "${certificate}"`
          );
        }

        // console.log("POST success", response);

        resolve(JSON.parse(response));
      },
      (err: string) => {
        console.log("POST error", err);

        // The "httpPOST" returns a string "HTTP error ..." that includes the stringified error message. So we cannot JSON.parse it without having somehow extract it from the string. This response may change over time, so this is a safer approach.
        if (err.includes("Transaction already in block chain")) {
          // If the error is "Transaction already in block chain", we can continue, because we can calculate the txId
          resolve({
            result: null,
            error: { code: -27, message: "Transaction already in block chain" },
            id: "curltest",
          });
        } else if (err.includes("bad-txns-inputs-missingorspent")) {
          // The error is "bad-txns-inputs-missingorspent" is returned when the UTXO is already spent. If the transaction is the same, I would expect the error to be "Transaction already in block chain", but it is not. One possibility may be because the transaction has different signatures, which could result in a "bad-txns-inputs-missingorspent" error. In any case, we should be fine continuing here, because if it is indeed an invalid transaction where the inputs are already spent, the following process will fail.
          resolve({
            result: null,
            error: { code: -25, message: "bad-txns-inputs-missingorspent" },
            id: "curltest",
          });
        } else {
          reject(err);
        }
      }
    );
  });
};
