import React from "react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { Face, Suit } from "@pairjacks/poker-cards";

import Card, { CardOrientation } from "../Card";

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
