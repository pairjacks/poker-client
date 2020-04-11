import type { Cards } from "poker-cards";

export interface ClientSplitPot {
  players: string[];
  chipCount: number;
}

export interface LimitedTable {
  readonly isStarted: boolean;
  readonly name: string;
  readonly bettingRound: BettingRound;
  readonly potChipCount: number;
  readonly splitPots: ClientSplitPot[];
  readonly seats: Seat[];
  readonly communityCards: Cards;
  readonly currentUser: {
    displayName: string;
    seatToken: string;
  };
}

export type BettingRound = "pre-deal" | "pre-flop" | "flop" | "turn" | "river";

export interface Seat {
  readonly token: string;
  readonly isDealer: boolean;
  readonly isTurnToBet: boolean;
  readonly isFolded: boolean;
  readonly isBust: boolean;
  readonly chipCount: number;
  readonly chipsBetCount: number;
  readonly player?: Player;
  readonly pocketCards?: Cards;
}

export interface Player {
  readonly displayName: string;
}

/**
 * Messages
 */

export interface ServerTableStateMessage {
  type: "table-state";
  table?: LimitedTable;
}

export const isServerMessage = (x: any): x is ServerMessage => {
  return typeof x.type === "string";
};

export type ServerMessage = ServerTableStateMessage;
