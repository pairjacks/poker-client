import React, { useRef, useState, useEffect } from "react";
import { withKnobs, select, boolean, number } from "@storybook/addon-knobs";
import { Face, Suit, createDeck } from "@pairjacks/poker-cards";

import Card, { CardOrientation } from "../Card";
import CardPile from "../CardPile";

export default {
  title: "Cards",
  component: Card,
  decorators: [withKnobs],
};

export const card = () => {
  const face = select("Face", { ...Face, None: undefined }, Face.Two);
  const suit = select("Suit", { ...Suit, None: undefined }, Suit.Diamonds);
  const orientation = select(
    "Orientation",
    { ...CardOrientation, None: undefined },
    undefined
  );
  const highlight = boolean("Highlight", false);

  return (
    <Card
      face={face}
      suit={suit}
      orientation={orientation}
      highlight={highlight}
    />
  );
};

const Pile = ({ num }: { num: number }) => {
  const deck = useRef([...createDeck()].sort(() => -1 + Math.random() * 2));
  const [cards, setCards] = useState(deck.current.slice(0, num));

  useEffect(() => {
    setCards(deck.current.slice(0, num));
  }, [num]);

  return (
    <CardPile>
      {cards.map(([face, suit], index) => (
        <Card face={face} suit={suit} key={[face, suit].join("")} />
      ))}
    </CardPile>
  );
};

export const cardPile = () => {
  const numCards = number("Num cards", 3, {
    min: 1,
    max: 26,
    range: true,
    step: 1,
  });

  return <Pile num={Math.round(numCards)} />;
};
