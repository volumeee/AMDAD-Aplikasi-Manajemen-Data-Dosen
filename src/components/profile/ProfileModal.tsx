import React from "react";
import { View, StyleSheet, Modal, Text, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import Avatar from "./Avatar";

interface ProfileModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  loading: boolean;
  profile: any;
  captureImageFromCamera: () => void;
  pickImageFromGallery: () => void;
  onLogout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  modalVisible,
  setModalVisible,
  loading,
  profile,
  captureImageFromCamera,
  pickImageFromGallery,
  onLogout,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          profile && (
            <View style={styles.modalContainer}>
              <Avatar size={150} url={profile.avatar_url} />
              <Text style={styles.profileText}>{profile.full_name}</Text>
              <Text style={{ marginBottom: 10 }}>Ganti foto profile:</Text>
              <View style={styles.flexButton}>
                <Button
                  mode="contained"
                  onPress={captureImageFromCamera}
                  style={styles.modalButton}
                >
                  Camera
                </Button>
                <Button
                  mode="contained"
                  onPress={pickImageFromGallery}
                  style={styles.modalButton}
                >
                  Gallery
                </Button>
              </View>
              <View style={styles.flexLogout}>
                <Button
                  mode="contained"
                  onPress={onLogout}
                  style={styles.logoutButton}
                >
                  Logout
                </Button>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
          )
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileText: {
    fontSize: 20,
    marginBottom: 0,
    fontWeight: "bold",
  },
  modalButton: {
    marginBottom: 10,
  },
  flexButton: {
    flexDirection: "row",
    gap: 10,
  },
  flexLogout: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  closeButton: {
    backgroundColor: "grey",
  },
  logoutButton: {
    backgroundColor: "red",
  },
});

export default ProfileModal;
