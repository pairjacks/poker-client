import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { FCWithoutChildren } from "../types/component";

const ChipStackComponent: FCWithoutChildren<{
  chipCount: number;
}> = ({ chipCount }) => {
  const twentyFiveChipsCount = Math.floor(chipCount / 2 / 25);
  const tenChipsCount = Math.floor(
    (chipCount - twentyFiveChipsCount * 25) / 2 / 10
  );
  const fiveChipsCount = Math.floor(
    (chipCount - twentyFiveChipsCount * 25 - tenChipsCount * 10) / 1.2 / 5
  );
  const oneChipsCount =
    chipCount -
    (25 * twentyFiveChipsCount + 10 * tenChipsCount + 5 * fiveChipsCount);

  return (
    <Container>
      {Array(twentyFiveChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip style={{ top: `${-2 * index}px`, backgroundColor: "green" }} />
        ))}
      {Array(tenChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip
            style={{
              top: `${-2 * index}px`,
              left: "25px",
              backgroundColor: "blue",
            }}
          />
        ))}
      {Array(fiveChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip
            style={{
              top: `${-2 * index}px`,
              left: "50px",
              backgroundColor: "red",
            }}
          />
        ))}
      {Array(oneChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip
            style={{
              top: `${-2 * index}px`,
              left: "75px",
              backgroundColor: "grey",
            }}
          />
        ))}
      {chipCount !== 0 && <Count>{chipCount}</Count>}
    </Container>
  );
};

export default observer(ChipStackComponent);

const Container = styled.div`
  position: relative;
  width: 140px;
  height: 30px;
  background-color: transparent;
`;

const Chip = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid black;
`;

const Count = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 100px;
`;
