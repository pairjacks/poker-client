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
    chipValueText: "white",
    // chipValueScale: ["blue", "red", "black"],
    chipValueScale: [
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
    ],
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
