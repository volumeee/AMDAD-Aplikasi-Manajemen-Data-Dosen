import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  Text,
  StatusBar,
} from "react-native";
import { AnimatedFAB } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import AvatarSection from "../components/profile/AvatarSection";
import ProfileModal from "../components/profile/ProfileModal";
import TableHeader from "../components/cruddosen/TableHeaderDDosen";
import TableRow from "../components/cruddosen/TableRowDDosen";
import { useProfile, useDataDosen } from "../hooks/SupabaseHooks";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../services/supabase";
import InputDosenModal from "../components/cruddosen/InputDosenModal";

interface DDosenScreenProps {
  email: string | null;
  handleLogout: () => void;
}

export default function DDosenScreen({
  email,
  handleLogout,
}: DDosenScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const { profile, fetchProfile } = useProfile();
  const { dosenData, fetchDataDosen } = useDataDosen(setLoading);

  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    changeScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    fetchProfile(setLoading, Alert);
    fetchDataDosen();
  }, []);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      uploadImage(image.uri);
    }
  };

  const captureImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      uploadImage(image.uri);
    }
  };

  const handleAvatarUpload = async (filePath: string) => {
    try {
      setLoading(true);

      const session = await supabase.auth.getSession();
      if (!session?.data?.session?.user)
        throw new Error("No user on the session!");

      const { data, error } = await supabase
        .from("profiles")
        .update({ avatar_url: filePath })
        .eq("id", session.data.session.user.id);

      if (error) {
        throw error;
      }

      fetchProfile(setLoading, Alert);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);
      const arrayBuffer = await fetch(uri).then((res) => res.arrayBuffer());
      const fileExt = uri.split(".").pop()?.toLowerCase() || "jpeg";
      const path = `${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(path, arrayBuffer, {
          contentType: "image/jpeg",
        });

      if (error) {
        throw error;
      }

      handleAvatarUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fabStyle = { right: 16 };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.flexHeading}>
          <View style={styles.title}>
            <View style={styles.titleText}>
              <Text style={styles.h1}>Welcome to the SAMDAD!</Text>
              <Text style={styles.subText}>
                Sistem Aplikasi Manajemen Data Dosen
              </Text>
            </View>
          </View>
          <AvatarSection
            loading={loading}
            profile={profile}
            email={email}
            onAvatarPress={() => setModalVisible(true)}
          />
        </View>
        <TableHeader />
        <FlatList
          data={dosenData}
          renderItem={({ item }) => (
            <TableRow item={item} refreshData={fetchDataDosen} />
          )}
          keyExtractor={(item) => item.nidn}
          onScroll={onScroll}
          contentContainerStyle={styles.tableBody}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
        <AnimatedFAB
          icon={"plus"}
          label={"Add "}
          extended={isExtended}
          onPress={() => setInputModalVisible(true)}
          visible={true}
          animateFrom={"right"}
          iconMode={"static"}
          style={[styles.fabStyle, fabStyle]}
          color="white"
        />
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          loading={loading}
          profile={profile}
          captureImageFromCamera={captureImageFromCamera}
          pickImageFromGallery={pickImageFromGallery}
          onLogout={handleLogout}
        />
        <InputDosenModal
          modalVisible={inputModalVisible}
          setModalVisible={setInputModalVisible}
          refreshData={fetchDataDosen}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  flexHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  titleText: {
    marginLeft: 10,
    justifyContent: "center",
  },
  h1: {
    fontSize: 24,
  },
  subText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fabStyle: {
    bottom: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    backgroundColor: "tomato",
  },
  tableBody: {
    width: "90%",
    marginTop: 5,
  },
});
