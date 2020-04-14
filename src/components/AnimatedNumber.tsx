import React from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";

import { FCWithoutChildren } from "../types/component";

const AnimatedNumber: FCWithoutChildren<{ value: number }> = ({ value }) => {
  const spring = useSpring({ value, config: config.slow });

  return (
    <Container>{spring.value.interpolate((x) => Math.round(x))}</Container>
  );
};

export default AnimatedNumber;

const Container = styled(animated.div)``;
