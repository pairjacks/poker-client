import React from "react";
import { Face, Suit } from "poker-cards";

import type { FCWithoutChildren } from "../types/component";
import styled from "styled-components";

const faceCharacterMap: { [key in Face]: string } = {
  [Face.Two]: "2",
  [Face.Three]: "3",
  [Face.Four]: "4",
  [Face.Five]: "5",
  [Face.Six]: "6",
  [Face.Seven]: "7",
  [Face.Eight]: "8",
  [Face.Nine]: "9",
  [Face.Ten]: "10",
  [Face.Jack]: "J",
  [Face.Queen]: "Q",
  [Face.King]: "K",
  [Face.Ace]: "A",
};

const suitCharacterMap: { [key in Suit]: string } = {
  [Suit.Diamonds]: "♦",
  [Suit.Clubs]: "♣",
  [Suit.Hearts]: "♥",
  [Suit.Spades]: "♠",
};

const Card: FCWithoutChildren<{
  face: Face;
  suit: Suit;
  highlight?: boolean;
}> = ({ face, suit, highlight = false }) => (
  <Container highlight={highlight}>
    <FaceChar>{faceCharacterMap[face]}</FaceChar>
    <SuitChar suit={suit}>{suitCharacterMap[suit]}</SuitChar>
  </Container>
);

export default Card;

const Container = styled.div<{ highlight: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6em;
  margin: 0.2em;
  padding: 0.4em 0;
  border-bottom: 1px solid
    ${({ highlight }) => (highlight ? "black" : "transparent")};
  background-color: ${({ theme }) => theme.colors.playingCardBackground};
`;

const FaceChar = styled.div`
  margin-right: 0.2em;
`;

const SuitChar = styled.div<{ suit: Suit }>`
  color: ${({ suit, theme }) =>
    [Suit.Hearts, Suit.Diamonds].includes(suit)
      ? theme.colors.playingCardSuitRed
      : theme.colors.playingCardSuitBlack};
`;
