export interface ProcessorResponse<T, U = unknown> {
  jsonrpc: "2.0";
  id: string;
  apiKey: string;
  result:
    | {
        type: "success";
        data: T;
      }
    | {
        type: "error";
        data: { message: string; stack: string; error: unknown; data: U };
      };
}

// The types of the objects that are sent from backend to processor
export interface GateKeeperDepositForwardTransactionRequest {
  jsonrpc: "2.0";
  id: string;
  method: "gatekeeperDepositForwardTransaction";
  apiKey: string;
  params: {
    transactionIdHex: string;
    targetRecipientHex: string;
    gatekeeper1PublicKeyHex: string;
    gatekeeper2PublicKeyHex: string;
    backupPublicKeyHex: string;
  };
}

export interface GateKeeperDepositForwardTransactionResponse
  extends ProcessorResponse<{
    txId: string /* transaction id */;
    txHex: string;
  }> {}

//////

export interface ConfirmUTXORequest {
  jsonrpc: "2.0";
  id: string;
  method: "confirmUTXO";
  apiKey: string;
  params: {
    transactionIdHex: string;
    inputIndex: number;
    gatekeeper1PublicKeyHex: string;
    gatekeeper2PublicKeyHex: string;
    backupPublicKeyHex: string;
    recipientTezosAddressHex: string;
  };
}

export interface ConfirmUTXOResponse
  extends ProcessorResponse<string /* tezos tx id */> {}

//////

export interface SignBurnRequest {
  jsonrpc: "2.0";
  id: string;
  method: "signBurn";
  apiKey: string;
  params: {
    burnId: number;
    custodyRedeemScriptHex: string;
  };
}

export interface RedeemBurnResponse
  extends ProcessorResponse<string /* tezos tx id */> {}

//////

export interface GateKeeperWithdrawForwardTransactionRequest {
  jsonrpc: "2.0";
  id: string;
  method: "gatekeeperWithdrawForwardTransaction";
  apiKey: string;
  params: {
    bigmapKeyHash: string;
    custodyRedeemScriptHex: string;
    gatekeeperRedeemScriptHex: string;
  };
}

export interface GateKeeperWithdrawForwardTransactionResponse
  extends ProcessorResponse<
    {
      withdrawTxId: string;
      withdrawTxHex: string;
      forwardTxId: string;
      forwardTxHex: string;
    },
    {
      withdrawTxId?: string;
      withdrawTxHex?: string;
      forwardTxId?: string;
      forwardTxHex?: string;
    }
  > {}

export interface ConfirmChangeUTXORequest {
  jsonrpc: "2.0";
  id: string;
  apiKey: string;
  method: "confirmChangeUTXO";
  params: {
    transactionIdHex: string;
  };
}

export interface ConfirmChangeUTXOResponse
  extends ProcessorResponse<string /* tezos tx id */> {}

// Ping / Pong

export interface PingRequest {
  jsonrpc: "2.0";
  id: string;
  method: "ping";
  apiKey: string;
  params: {};
}

export interface PingResponse extends ProcessorResponse<"pong"> {}

export interface RpcConfig {
  url: string;
  port: number;
  headers: Record<string, string>;
  certificate: string;
}
