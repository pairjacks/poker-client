const baseTheme = {
  name: "light",
  fonts: {
    bodyText: "Quicksand, system-ui, sans-serif",
  },
  colors: {
    bodyText: "black",
    background: "white",
    serverConnecting: "lightgrey",
    serverConnected: "green",
    serverDisconnected: "red",
    playingCardBackground: "white",
    playingCardBack: "#efefef",
    playingCardBackAccent: "darkgrey",
    playingCardFaceValue: "black",
    playingCardSuitRed: "red",
    playingCardSuitBlack: "black",
    playingCardHighlight: "rgba(10, 10, 255, 0.4)",
    playingCardPlaceholderBorder: "#efefef",
    playerSeatBackground: "white",
    opponentSeatBackground: "lightgrey",
    keyline: "lightgrey",
    currentTurnAccent: "green",
    chipValueText: "white",
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

export type Theme = typeof baseTheme;

export const lightTheme: Theme = baseTheme;

export const darkTheme: Theme = {
  ...baseTheme,
  name: "dark",
  colors: {
    ...baseTheme.colors,
    background: "#181818",
    bodyText: "white",
    playerSeatBackground: "#111",
    opponentSeatBackground: "darkslategray",
    chipValueScale: ["blue", "red", "black"],
    playingCardBackground: "black",
    playingCardBack: "black",
    playingCardBackAccent: "dimgrey",
    playingCardFaceValue: "white",
    playingCardSuitBlack: "white",
    playingCardHighlight: "rgba(255, 255, 255, 0.6)",
    playingCardPlaceholderBorder: "#333",
  },
};

export const defaultTheme = lightTheme;

export interface ThemeProps {
  theme?: Theme;
}
