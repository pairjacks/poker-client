import React from "react";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./style/theme";
import GlobalStyle from "./style/GlobalStyle";
import { Store, StoreContext } from "./state/store";
import AppRoot from "./AppRoot";

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <StoreContext.Provider value={new Store()}>
      <AppRoot />
    </StoreContext.Provider>
  </ThemeProvider>
);

export default App;
