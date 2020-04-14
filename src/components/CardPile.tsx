import React, { Children } from "react";
import styled from "styled-components";
import { animated, config, useTransition } from "react-spring";

import type { FunctionComponent } from "react";
import type { CardElement } from "./Card";

const outTransform = () =>
  `translate3d(0, ${Math.random() < 0.5 ? -40 : 40}%, 0)`;

const CardPile: FunctionComponent<{ children: CardElement[] }> = ({
  children,
}) => {
  const childArray = Children.toArray(children).filter(
    (child) => !!child
  ) as CardElement[];

  const springs = useTransition(childArray, (child) => child?.key || "", {
    from: { transform: outTransform(), opacity: 0 },
    enter: { transform: "translate3d(0, 0px, 0)", opacity: 1 },
    leave: { transform: outTransform(), opacity: 0 },
    config: config.gentle,
  });

  return (
    <Container>
      {springs.map(({ item, key, props }) => {
        return (
          <CardContainer key={key} style={props}>
            {item}
          </CardContainer>
        );
      })}
    </Container>
  );
};

export default CardPile;

const Container = styled.div`
  display: flex;
`;

const CardContainer = styled(animated.div)`
  :not(:last-of-type) {
    margin-right: 0.4em;
  }
`;
