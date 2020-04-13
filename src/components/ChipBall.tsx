import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

import { getColorScaler } from "../lib/util/color";
import { useStore } from "../state/store";

import type { FCWithoutChildren } from "../types/component";

const ChipBallComponent: FCWithoutChildren<{
  chipCount: number;
}> = ({ chipCount }) => {
  const store = useStore();

  return (
    <Container>
      {chipCount !== 0 && (
        <Ball ratio={chipCount / (store.data.table?.maxBetChipCount || 1000)}>
          {chipCount}
        </Ball>
      )}
    </Container>
  );
};

export default observer(ChipBallComponent);

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: transparent;
`;

const Ball = styled.div<{ ratio: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ ratio }) => Math.floor(ratio * 80) + 20}px;
  height: ${({ ratio }) => Math.floor(ratio * 80) + 20}px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.chipValueText};
  background-color: ${({ theme, ratio }) =>
    getColorScaler(theme.colors.chipValueScale)(ratio)};
`;
