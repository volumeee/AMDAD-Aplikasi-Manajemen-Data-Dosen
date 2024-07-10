import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Avatar from "./Avatar";

interface AvatarSectionProps {
  loading: boolean;
  profile: any;
  email: string | null;
  onAvatarPress: () => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  loading,
  profile,
  email,
  onAvatarPress,
}) => (
  <View style={styles.account}>
    <View style={styles.flexProfile}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Avatar size={50} url={profile?.avatar_url} onPress={onAvatarPress} />
      )}
      {email && <Text style={styles.email}>{email}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  account: {
    width: "30%",
    marginTop: 10,
  },
  flexProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  email: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default AvatarSection;
