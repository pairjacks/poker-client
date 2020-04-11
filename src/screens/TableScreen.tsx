import React, { useMemo } from "react";
import { extractHand, isSameCard } from "poker-cards";
import styled from "styled-components";

import { useStore } from "../state/store";
import Card from "../components/Card";
import Seat from "../components/Seat";

import type { FCWithoutChildren } from "../types/component";

const TableScreen: FCWithoutChildren = () => {
  const store = useStore();

  if (!store.data.table) throw new Error("Expected a table");

  const currentPlayerHand = useMemo(() => {
    if (!store.data.table) return undefined;

    const pocketCards = store.data.table.seats.find(
      (s) => s.token === store.data.table?.currentUser.seatToken
    )?.pocketCards;

    if (!pocketCards) return undefined;

    return extractHand({
      pocketCards,
      communityCards: [...store.data.table.communityCards],
    });
  }, [store.data.table]);

  return (
    <Container>
      {!store.data.table.isStarted && (
        <StartButton onClick={store.onStartGame}>Start Game</StartButton>
      )}
      <Pots>{`Pot: ${store.data.table.potChipCount}`}</Pots>
      {store.data.table.splitPots.map((splitPot) => (
        <Pots>{`Split Pot: ${splitPot.chipCount} - ${splitPot.players.join(
          ", "
        )}`}</Pots>
      ))}
      <Board>
        {store.data.table.communityCards.map(([face, suit]) => (
          <Card
            face={face}
            suit={suit}
            highlight={
              !!currentPlayerHand?.rankCards.find((card) =>
                isSameCard(card, [face, suit])
              )
            }
            key={`${face}${suit}`}
          />
        ))}
      </Board>
      <Seats>
        {store.data.table.seats.map((s) => {
          const isCurrentUser =
            store.data.table?.currentUser.seatToken === s.token;

          return (
            <Seat
              key={s.token}
              tableName={store.data.table?.name || ""}
              seat={s}
              canBet={
                !!store.data.table?.isStarted &&
                isCurrentUser &&
                store.data.table?.bettingRound !== "pre-deal" &&
                s.isTurnToBet
              }
              isCurrentUser={isCurrentUser}
              isTurn={s.isTurnToBet}
              isFolded={s.isFolded}
              isBust={s.isBust}
              isDealer={s.isDealer}
              canDeal={
                !!store.data.table?.isStarted &&
                store.data.table?.bettingRound === "pre-deal" &&
                store.data.table?.currentUser.seatToken === s.token &&
                s.isDealer
              }
              pocketCards={isCurrentUser ? s.pocketCards : undefined}
              hand={isCurrentUser ? currentPlayerHand : undefined}
              onBetPress={store.onPlaceBet}
              onCallPress={store.onCall}
              onCheckPress={store.onCheck}
              onFoldPress={store.onFold}
              onDealPress={store.onDeal}
            />
          );
        })}
      </Seats>
    </Container>
  );
};

export default TableScreen;

const Container = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
`;

const StartButton = styled.button`
  margin: 2em auto;
`;

const Pots = styled.div`
  margin: 2em auto;
`;

const Board = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em auto;
`;

const Seats = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
