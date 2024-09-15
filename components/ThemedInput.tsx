import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
export type Props = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TextInput style={[{ backgroundColor, color }, style]} {...otherProps} />
  );
}
