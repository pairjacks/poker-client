import React, { useMemo } from "react";
import { extractHand, isSameCard, Cards } from "@pairjacks/poker-cards";
import styled from "styled-components";

import { useStore } from "../state/store";
import ConnectionStatus from "../components/ConnectionStatus";
import Seat from "../components/Seat";
import ChipBall from "../components/ChipBall";
import CardPile from "../components/CardPile";
import Card from "../components/Card";

import type { FCWithoutChildren } from "../types/component";

const urlWithPath = (path: string) =>
  window.location.protocol + "//" + window.location.host + "/" + path;

const TableScreen: FCWithoutChildren = () => {
  const store = useStore();
  const { table } = store.data;

  if (!table) throw new Error("Expected a table");

  const currentPlayerHand = useMemo(() => {
    if (!table) return undefined;

    const pocketCards = table.seats.find(
      (s) => s.token === table?.currentUser.seatToken
    )?.pocketCards;

    if (!pocketCards) return undefined;

    return extractHand({
      pocketCards,
      communityCards: [...table.communityCards],
    });
  }, [table]);

  const describeHand = (pocketCards?: Cards) => {
    if (!table) return undefined;

    if (!pocketCards) return undefined;

    return extractHand({
      pocketCards,
      communityCards: [...table.communityCards],
    });
  };

  const url =
    !table.isStarted && !!table.seats.find((s) => s.isEmpty)
      ? urlWithPath(`${table.name}`)
      : undefined;

  return (
    <Container>
      <TopRight>
        <ConnectionStatus />
      </TopRight>
      {!table.isStarted && (
        <StartButton onClick={store.onStartGame}>Start Game</StartButton>
      )}
      {url && (
        <Center>
          Table URL:
          <a href={url}>{url}</a>
        </Center>
      )}
      <Pots>
        {[table.activePot, ...table.splitPots]
          .filter((sp) => !!sp.chipCount)
          .map((splitPot) => (
            <CenterMargin>
              <ChipBall chipCount={splitPot.chipCount} />
              {splitPot.players.join(", ")}
            </CenterMargin>
          ))}
      </Pots>
      <Board>
        <CardPile slots={5}>
          {table.communityCards.map(([face, suit]) => (
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
        </CardPile>
      </Board>
      <Seats>
        {table.seats.map((s) => {
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
              pocketCards={s.pocketCards}
              hand={
                s.pocketCards && s.pocketCards.length
                  ? describeHand(s.pocketCards)
                  : undefined
              }
              onDisplayNamePress={
                isCurrentUser && !s.isFolded && !s.isBust
                  ? store.onChangeDisplayName
                  : undefined
              }
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

const TopRight = styled.div`
  display: block;
  position: absolute;
  right: 2em;
  top: 1em;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CenterMargin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2em;
`;

const StartButton = styled.button`
  margin: 2em auto;
`;

const Pots = styled.div`
  margin: 2em auto;
  display: flex;
  flex-direction: "row";
`;

const Board = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em auto;
`;

const Seats = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
`;
