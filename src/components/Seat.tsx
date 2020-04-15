import React, { useState, useMemo } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { isSameCard, describeHand } from "@pairjacks/poker-cards";

import Card from "./Card";
import ChipBall from "./ChipBall";
import CardPile from "./CardPile";

import type { Hand, Cards } from "@pairjacks/poker-cards";
import type { Seat } from "@pairjacks/poker-messages";
import type { FCWithoutChildren } from "../types/component";

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
  onDisplayNamePress?: () => unknown;
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
  onDisplayNamePress,
  onBetPress,
  onCallPress,
  onCheckPress,
  onFoldPress,
  onDealPress,
}) => {
  const [betInputValue, setBetInputValue] = useState<string>("");

  const emoji = useMemo(() => {
    if (isBust) return "😵";
    if (isFolded) return "🏳";

    return seat.displayName;
  }, [isBust, isFolded, seat.displayName]);

  return (
    <OuterContainer>
      <Center>
        <ChipBall chipCount={seat.chipsBetCount} />
      </Center>
      <Container isCurrentPlayer={isCurrentUser} isTurn={isTurn}>
        {seat.isEmpty ? (
          <Item>Empty</Item>
        ) : (
          <>
            {isDealer && <DealerButton>D</DealerButton>}
            <Item onClick={onDisplayNamePress} style={{ fontSize: 40 }}>
              {emoji}
            </Item>
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
                  onClick={() => {
                    onBetPress(Number(betInputValue));
                    setBetInputValue("");
                  }}
                  disabled={!betInputValue}
                >
                  Bet
                </BetButton>
                <BetButton onClick={onCheckPress}>Check</BetButton>
                <BetButton onClick={onCallPress}>Call</BetButton>
                <BetButton onClick={onFoldPress}>Fold</BetButton>
              </Item>
            )}
            <Center style={{ marginTop: 0 }}>
              <ChipBall chipCount={seat.chipCount} />
            </Center>
            {pocketCards && (
              <Item>
                <PocketCards>
                  <CardPile slots={2}>
                    {pocketCards.map(([face, suit]) => (
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
                  </CardPile>
                </PocketCards>
              </Item>
            )}
            {canDeal ? (
              <Item>
                <DealButton onClick={onDealPress}>Deal</DealButton>
              </Item>
            ) : null}
          </>
        )}
      </Container>
      {hand ? Object.values(describeHand(hand)).join(", ") : " "}
    </OuterContainer>
  );
};

export default observer(SeatComponent);

const OuterContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline-start: 0;
`;

const Container = styled.ul<{ isCurrentPlayer: boolean; isTurn: boolean }>`
  position: relative;
  flex: 1 0;
  width: 14em;
  margin: 1em;
  padding: 1em;
  border: ${({ isCurrentPlayer: isCurrentUser, isTurn, theme }) =>
    isTurn
      ? `5px solid ${theme.colors.currentTurnAccent}`
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

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

const PocketCards = styled.div`
  display: flex;
  justify-content: center;
`;

const DealerButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 1em;
  top: 1em;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: black;
  color: white;
`;

const BetInputContainer = styled.label`
  width: 5em;
`;

const BetButton = styled.button`
  margin: 0.4em;
`;

const DealButton = styled.button`
  margin: 1.2em;
`;
