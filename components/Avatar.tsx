import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

interface AvatarProps {
  uri?: string;
  size?: number;
  initials: string;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size = 50, initials }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <View
      style={[
        styles.avatarContainer,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {!imageError && uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.avatar,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.fallbackContainer,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={styles.initials}>{initials}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0", // Fallback background color
  } as ViewStyle,
  avatar: {
    resizeMode: "cover",
  } as ImageStyle,
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200EA", // Background color for initials
  } as ViewStyle,
  initials: {
    color: "#FFFFFF",
    fontSize: 20, // Adjust font size based on the size of the avatar
    fontWeight: "bold",
  } as TextStyle,
});

export default Avatar;
