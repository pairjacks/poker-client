import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import ChipBall from "../ChipBall";
import { withStore } from "../../lib/storybookHelpers";

export default {
  title: "ChipBall",
  component: ChipBall,
  decorators: [withKnobs],
};

export const noTableMax = () => {
  const chipCount = number("chipCount", 5);

  return withStore(() => <ChipBall chipCount={chipCount} />).Component;
};

export const withTableMax = () => {
  const chipCount = number("chipCount", 5);
  const maxBetChipCount = number("maxBetChipCount", 20);
  const { store, Component } = withStore(() => (
    <ChipBall chipCount={chipCount} />
  ));

  Object.defineProperty(store.data, "table", {
    get() {
      return { maxBetChipCount };
    },
  });

  return Component;
};
