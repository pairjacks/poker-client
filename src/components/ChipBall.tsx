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

  const ratio = chipCount / (store.data.table?.maxBetChipCount || 1000);
  const color = colors[Math.floor(ratio * colors.length)];
  const size = Math.floor(ratio * 80) + 20;

  return (
    <Container>
      {chipCount && (
        <Chip color={color} size={size}>
          {chipCount}
        </Chip>
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

const Chip = styled.div<{ color: string; size: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.chipValue};
  background-color: ${({ color }) => color};
`;
