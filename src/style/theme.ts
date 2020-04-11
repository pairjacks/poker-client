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
  },
};

export const defaultTheme: Theme = theme;

export type Theme = typeof theme;

export interface ThemeProps {
  theme?: Theme;
}
