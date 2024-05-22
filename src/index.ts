import {
  ConfirmChangeUTXORequest,
  ConfirmUTXORequest,
  GateKeeperDepositForwardTransactionRequest,
  GateKeeperWithdrawForwardTransactionRequest,
  PingRequest,
  SignBurnRequest,
} from "./utils/types";

import { gatekeeperDepositForwardTransaction } from "./methods/gatekeeper/gatekeeperDepositForwardTransaction";
import { confirmUTXO } from "./methods/signer/confirmUTXO";
import { signBurn } from "./methods/signer/signBurn";
import { gatekeeperWithdrawForwardTransaction } from "./methods/gatekeeper/gatekeeperWithdrawForwardTransaction";
import { confirmChangeUTXO } from "./methods/signer/confirmChangeUTXO";

import { ACURAST_ENVIRONMENT_VARIABLES } from "./constants/acurast";

declare const _STD_: any;

_STD_.ws.open(
  [
    "wss://websocket-proxy-1.prod.gke.acurast.com/",
    "wss://websocket-proxy-2.prod.gke.acurast.com/",
  ],
  () => {
    console.log("WebSocket connection opened successfully!");
    _STD_.ws.registerPayloadHandler(
      async (payload: {
        sender: string;
        recipient: string;
        payload: string;
      }) => {
        const buf = Buffer.from(payload.payload, "hex");
        const decoded = buf.toString("utf8");

        try {
          const parsed:
            | GateKeeperDepositForwardTransactionRequest
            | ConfirmUTXORequest
            | SignBurnRequest
            | GateKeeperWithdrawForwardTransactionRequest
            | ConfirmChangeUTXORequest
            | PingRequest = JSON.parse(decoded);

          if (
            parsed.apiKey !==
            _STD_.env[ACURAST_ENVIRONMENT_VARIABLES.WEBSOCKET_API_KEY]
          ) {
            console.log(`Invalid API Key ${parsed.apiKey}`);
            return;
          }

          console.log("Decoded Payload", decoded);

          let response;
          let responseType: "success" | "error" = "success";

          switch (parsed.method) {
            case "gatekeeperDepositForwardTransaction":
              try {
                response = await gatekeeperDepositForwardTransaction(
                  parsed.params.transactionIdHex,
                  parsed.params.targetRecipientHex,
                  parsed.params.gatekeeper1PublicKeyHex,
                  parsed.params.gatekeeper2PublicKeyHex,
                  parsed.params.backupPublicKeyHex
                );
              } catch (e: any) {
                responseType = "error";
                response = e;
              }

              break;
            case "confirmUTXO":
              try {
                response = await confirmUTXO(
                  parsed.params.transactionIdHex,
                  parsed.params.gatekeeper1PublicKeyHex,
                  parsed.params.gatekeeper2PublicKeyHex,
                  parsed.params.backupPublicKeyHex,
                  parsed.params.recipientTezosAddressHex
                );
              } catch (e: any) {
                responseType = "error";
                response = e;
              }
              break;
            case "signBurn":
              try {
                response = await signBurn(
                  parsed.params.burnId,
                  parsed.params.custodyRedeemScriptHex
                );
              } catch (e: any) {
                responseType = "error";
                response = e;
              }
              break;
            case "gatekeeperWithdrawForwardTransaction":
              try {
                response = await gatekeeperWithdrawForwardTransaction(
                  parsed.params.bigmapKeyHash,
                  parsed.params.custodyRedeemScriptHex,
                  parsed.params.gatekeeperRedeemScriptHex
                );
              } catch (e: any) {
                responseType = "error";
                response = e;
              }
              break;
            case "confirmChangeUTXO":
              try {
                response = await confirmChangeUTXO(
                  parsed.params.transactionIdHex
                );
              } catch (e: any) {
                responseType = "error";
                response = e;
              }
              break;
            case "ping":
              response = "pong";
              break;
            default:
              responseType = "error";
              response = "UNKNOWN METHOD";
              console.log("UNKNOWN METHOD");
              break;
          }

          const responseObject = {
            jsonrpc: "2.0",
            id: parsed.id,
            result: { type: responseType, data: response },
          };

          console.log("Response", JSON.stringify(responseObject));

          _STD_.ws.send(
            payload.sender,
            Buffer.from(JSON.stringify(responseObject), "utf8").toString("hex")
          );
        } catch (e) {
          console.log("ERROR", e);
        }
      }
    );
  },
  (err: any) => {
    console.log("open: error " + err);
  }
);
