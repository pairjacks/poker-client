export const theme = {
  name: "light",
  fonts: {
    bodyText: "system-ui, sans-serif",
  },
  colors: {
    bodyText: "black",
    background: "white",
    serverConnecting: "lightgrey",
    serverConnected: "green",
    serverDisconnected: "red",
    playingCardBackground: "white",
    playingCardFaceValue: "black",
    playingCardSuitRed: "red",
    playingCardSuitBlack: "black",
    playerSeatBackground: "white",
    opponentSeatBackground: "lightgrey",
    keyline: "lightgrey",
    currentTurnAccent: "green",
    chipValue: "white",
    chipBorder: "black",
    chip1: "grey",
    chip5: "red",
    chip10: "blue",
    chip25: "green",
  },
};

export const defaultTheme: Theme = theme;

export type Theme = typeof theme;

export interface ThemeProps {
  theme?: Theme;
}
