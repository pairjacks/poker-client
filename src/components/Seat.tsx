import React, { useState, useMemo } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { isSameCard, describeHand } from "poker-cards";

import Card from "./Card";

import type { Hand, Cards } from "poker-cards";
import type { Seat } from "poker-messages";
import type { FCWithoutChildren } from "../types/component";

const urlWithPath = (path: string) =>
  window.location.protocol + "//" + window.location.host + "/" + path;

const SeatComponent: FCWithoutChildren<{
  tableName: string;
  seat: Seat;
  isCurrentUser: boolean;
  isTurn: boolean;
  isFolded: boolean;
  isBust: boolean;
  isDealer: boolean;
  canDeal: boolean;
  canBet: boolean;
  hand?: Hand;
  pocketCards?: Cards;
  onDealPress: () => unknown;
  onBetPress: (value: number) => unknown;
  onCheckPress: () => unknown;
  onCallPress: () => unknown;
  onFoldPress: () => unknown;
}> = ({
  tableName,
  seat,
  isCurrentUser,
  isFolded,
  isBust,
  isDealer,
  isTurn,
  canDeal,
  canBet,
  hand,
  pocketCards,
  onBetPress,
  onCallPress,
  onCheckPress,
  onFoldPress,
  onDealPress,
}) => {
  const [betInputValue, setBetInputValue] = useState<string>("");

  const deathText = useMemo(() => {
    if (isBust) return "Out of the game 😵";
    if (isFolded) return "Folded 🏳";
    return "";
  }, [isBust, isFolded]);

  const displayName = seat.player?.displayName;

  if (displayName === undefined) {
    const url = urlWithPath(`${tableName}/${seat.token}`);

    return (
      <Container isCurrentPlayer={isCurrentUser} isTurn={isTurn}>
        <Item>Empty</Item>
        <Item>
          <a href={url}>{url}</a>
        </Item>
      </Container>
    );
  }

  return (
    <Container isCurrentPlayer={isCurrentUser} isTurn={isTurn}>
      <Item>{displayName || "Empty"}</Item>
      <Item>Chip count: {seat.chipCount}</Item>
      {canBet && (
        <Item>
          <BetInputContainer>
            Bet:
            <input
              type="text"
              value={betInputValue}
              onChange={(event) => setBetInputValue(event.target.value)}
            />
          </BetInputContainer>
          <BetButton
            onClick={() => onBetPress(Number(betInputValue))}
            disabled={!betInputValue}
          >
            Bet
          </BetButton>
          <BetButton onClick={onCheckPress}>Check</BetButton>
          <BetButton onClick={onCallPress}>Call</BetButton>
          <BetButton onClick={onFoldPress}>Fold</BetButton>
        </Item>
      )}
      <Item>Current Bet: {seat.chipsBetCount}</Item>
      {isCurrentUser && (
        <Item>
          <PocketCards>
            {pocketCards?.map(([face, suit]) => (
              <Card
                face={face}
                suit={suit}
                highlight={
                  !!hand?.rankCards.find((card) =>
                    isSameCard(card, [face, suit])
                  )
                }
                key={`${face}${suit}`}
              />
            ))}
          </PocketCards>
          {hand ? describeHand(hand) : null}
        </Item>
      )}
      {isDealer ? <Item>{"Dealer ✋"}</Item> : null}
      {deathText ? <Item>{deathText}</Item> : null}
      {canDeal ? (
        <Item>
          <DealButton onClick={onDealPress}>Deal</DealButton>
        </Item>
      ) : null}
    </Container>
  );
};

export default observer(SeatComponent);

const Container = styled.ul<{ isCurrentPlayer: boolean; isTurn: boolean }>`
  flex: 1 0;
  margin: 1em;
  padding: 1em;
  border: ${({ isCurrentPlayer: isCurrentUser, isTurn, theme }) =>
    isTurn
      ? `2px solid ${theme.colors.currentTurnAccent}`
      : `1px solid ${isCurrentUser ? theme.colors.keyline : "transparent"}`};
  list-style-type: none;
  background-color: ${({ isCurrentPlayer, theme }) =>
    isCurrentPlayer
      ? theme.colors.playerSeatBackground
      : theme.colors.opponentSeatBackground};
`;

const Item = styled.li`
  margin-bottom: 0.4em;
`;

const PocketCards = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
`;

const BetInputContainer = styled.label`
  margin: 0 1.2em 0 1em;
`;

const BetButton = styled.button`
  margin: 0.4em;
`;

const DealButton = styled.button`
  margin: 1.2em;
`;
