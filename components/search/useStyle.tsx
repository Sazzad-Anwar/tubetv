import { StyleSheet } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

export default function useSearchStyle() {
  const borderColor = useThemeColor({}, "border");
  const styles = StyleSheet.create({
    searchContainer: {
      borderColor: "transparent",
      borderBottomWidth: 1,
      marginBottom: 0,
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: borderColor,
    },
    search: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 18,
      width: "100%",
    },
    backNavigation: {
      width: 35,
      height: 35,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 40,
      justifyContent: "center",
      marginLeft: 10,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: borderColor,
    },
    titleContainer: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    roundedImageContainer: {
      height: 54,
      width: 54,
      backgroundColor: "red",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
    },
    roundedImage: {
      height: 50,
      width: 50,
      backgroundColor: "red",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
    },
    cardTitle: {
      padding: 0,
      margin: 0,
      fontSize: 16,
      lineHeight: 16,
      paddingBottom: 3,
      fontWeight: "500",
    },
    cardSubTitle: {
      padding: 0,
      margin: 0,
      fontSize: 12,
      fontWeight: "400",
    },
  });
  return styles;
}
