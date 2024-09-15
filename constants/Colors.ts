/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#ff3830";
const tintColorDark = "#d50000";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    background1: "#eaeaea",
    background2: "#cbc9c9",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    loader: "#687076",
    border: "#E0E0E0",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    background1: "#454545",
    background2: "#2e2e2e",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    loader: "#9BA1A6",
    border: "#303030",
  },
};
