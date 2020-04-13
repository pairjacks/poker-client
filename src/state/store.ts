import React, { useContext } from "react";
import { observable } from "mobx";
import { isServerMessage } from "@pairjacks/poker-messages";
import type {
  LimitedTable,
  ClientJoinTableMessage,
  ClientCreateTableMessage,
  ClientStartGameMessage,
  ClientPlaceBetMessage,
  ClientMessage,
  ClientDealMessage,
  ClientFoldMessage,
  ClientCallMessage,
  ClientCheckMessage,
} from "@pairjacks/poker-messages";

export interface JoinTableOptions {
  seatToken: string;
  tableName: string;
}

export interface CreateTableOptions {
  tableName: string;
  numberOfSeats: number;
  startingChipCount: number;
  smallBlind: number;
}

export type ServerConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected";

interface AppState {
  connectionStatus: ServerConnectionStatus;
  table?: LimitedTable;
}

export class Store {
  @observable data: AppState = {
    connectionStatus: "disconnected",
  };

  private ws?: WebSocket;
  private pingIntervalRef?: number;

  connect = () => {
    this.data.connectionStatus = "connecting";

    // this.ws = new WebSocket("wss://easy-poker-server.herokuapp.com");
    this.ws = new WebSocket("ws://localhost:8080");

    this.ws.addEventListener("open", () => {
      this.data.connectionStatus = "connected";

      clearInterval(this.pingIntervalRef);
      this.pingIntervalRef = setInterval(() => {
        this.ws?.send("PING");
      }, 20000);

      const pathnameParts = window.location.pathname.split("/");

      const tableName = pathnameParts[1];
      const seatToken = pathnameParts[2];

      if (tableName && seatToken) this.onJoinTable({ tableName, seatToken });
    });

    this.ws.addEventListener("close", () => {
      this.data.connectionStatus = "disconnected";
    });

    this.ws.addEventListener("error", () => {
      this.data.connectionStatus = "disconnected";
    });

    this.ws.addEventListener("message", (event) => {
      if (typeof event.data !== "string") {
        console.log("Unable to process event: ", event);
        return;
      }

      const message = JSON.parse(event.data);
      console.log("Parsed message: ", message);

      if (!isServerMessage(message)) {
        console.log("Unable to parse message: ", message);
        return;
      }

      switch (message.type) {
        case "table-state":
          this.data.table = message.table;
          if (message.table && window.location.pathname === "/") {
            window.history.pushState(
              "page2",
              "Title",
              `${message.table.name}/${message.table.currentUser.seatToken}`
            );
          }
          break;
      }
    });
  };

  onJoinTable = (options: JoinTableOptions) => {
    const joinTableMessage: ClientJoinTableMessage = {
      type: "client/join-table",
      ...options,
    };

    this.sendMessage(joinTableMessage);
  };

  onCreateTable = (options: CreateTableOptions) => {
    const createTableMessage: ClientCreateTableMessage = {
      type: "client/create-table",
      ...options,
    };

    this.sendMessage(createTableMessage);
  };

  onStartGame = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const startGameMessage: ClientStartGameMessage = {
      type: "client/start-game",
      tableName,
      seatToken,
    };

    this.sendMessage(startGameMessage);
  };

  onDeal = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const dealMessage: ClientDealMessage = {
      type: "client/deal",
      tableName,
      seatToken,
    };

    this.sendMessage(dealMessage);
  };

  onPlaceBet = (chipCount: number) => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken || !chipCount) {
      return;
    }

    const placeBetMessage: ClientPlaceBetMessage = {
      type: "client/place-bet",
      tableName,
      seatToken,
      chipCount,
    };

    this.sendMessage(placeBetMessage);
  };

  onCall = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const callMessage: ClientCallMessage = {
      type: "client/call",
      tableName,
      seatToken,
    };

    this.sendMessage(callMessage);
  };

  onCheck = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const callMessage: ClientCheckMessage = {
      type: "client/check",
      tableName,
      seatToken,
    };

    this.sendMessage(callMessage);
  };

  onFold = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const foldMessage: ClientFoldMessage = {
      type: "client/fold",
      tableName,
      seatToken,
    };

    this.sendMessage(foldMessage);
  };

  private sendMessage = (message: ClientMessage) => {
    if (!this.ws) return;

    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  };
}

export const StoreContext = React.createContext<Store>(new Store());

export const useStore = () => useContext(StoreContext);
