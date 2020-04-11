export interface ClientCreateTableMessage {
  type: "client/create-table";
  tableName: string;
  numberOfSeats: number;
  startingChipCount: number;
  smallBlind: number;
}

export interface ClientJoinTableMessage {
  type: "client/join-table";
  tableName: string;
  seatToken: string;
}

export interface ClientLeaveTableMessage {
  type: "client/leave-table";
  tableName: string;
  seatToken: string;
}

export interface ClientRequestTableStateMessage {
  type: "client/request-table-state";
  tableName: string;
  seatToken: string;
}

export interface ClientStartGameMessage {
  type: "client/start-game";
  tableName: string;
  seatToken: string;
}

export interface ClientDealMessage {
  type: "client/deal";
  tableName: string;
  seatToken: string;
}

export interface ClientPlaceBetMessage {
  type: "client/place-bet";
  tableName: string;
  seatToken: string;
  chipCount: number;
}

export interface ClientFoldMessage {
  type: "client/fold";
  tableName: string;
  seatToken: string;
}

export interface ClientCallMessage {
  type: "client/call";
  tableName: string;
  seatToken: string;
}

export interface ClientCheckMessage {
  type: "client/check";
  tableName: string;
  seatToken: string;
}

export type ClientMessage =
  | ClientCreateTableMessage
  | ClientJoinTableMessage
  | ClientLeaveTableMessage
  | ClientRequestTableStateMessage
  | ClientStartGameMessage
  | ClientDealMessage
  | ClientPlaceBetMessage
  | ClientFoldMessage
  | ClientCallMessage
  | ClientCheckMessage;

export const isClientMessage = (x: any): x is ClientMessage => {
  return typeof x.type === "string" && x.type.startsWith("client/");
};
