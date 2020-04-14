import React from "react";
import styled from "styled-components";
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import GlobalStyle from "../src/style/GlobalStyle";
import { lightTheme, darkTheme } from "../src/style/theme";

addDecorator((s) => (
  <>
    <GlobalStyle />
    {s()}
  </>
));
addDecorator((s) => <Padded>{s()}</Padded>);
addDecorator(withThemesProvider([darkTheme, lightTheme]));

const Padded = styled.div`
  padding: 2em;
`;
