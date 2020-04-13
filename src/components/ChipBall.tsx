import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { FCWithoutChildren } from "../types/component";
import { useStore } from "../state/store";

const colors = [
  "rgb(0,0,255)", // Blue
  "rgb(21,1,233)",
  "rgb(42,3,211)",
  "rgb(63,4,189)",
  "rgb(84,5,167)",
  "rgb(105,6,145)",
  "rgb(127,8,124)",
  "rgb(148,9,102)",
  "rgb(169,10,80)",
  "rgb(190,11,58)",
  "rgb(211,13,36)",
  "rgb(232,14,14)", // Red
  "rgb(211,13,13)",
  "rgb(190,11,11)",
  "rgb(169,10,10)",
  "rgb(148,9,9)",
  "rgb(127,8,8)",
  "rgb(105,6,6)",
  "rgb(84,5,5)",
  "rgb(63,4,4)",
  "rgb(42,3,3)",
  "rgb(21,1,1)",
  "rgb(0,0,0)", // Black
];

const ChipBallComponent: FCWithoutChildren<{
  chipCount: number;
}> = ({ chipCount }) => {
  const store = useStore();

  const maxChipCount = store.data.table?.maxBetChipCount || 1000;
  const colorIndex = Math.floor((chipCount / maxChipCount) * colors.length);
  const size = Math.floor((chipCount / maxChipCount) * 80) + 20;

  return (
    <Container>
      {chipCount !== 0 && (
        <Chip
          style={{
            backgroundColor: colors[colorIndex],
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        >
          {chipCount}
        </Chip>
      )}
    </Container>
  );
};

export default observer(ChipBallComponent);

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const Chip = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  color: white;
`;
