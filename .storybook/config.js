import React from "react";
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
addDecorator(withThemesProvider([lightTheme, darkTheme]));
