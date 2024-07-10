import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../../services/supabase";
import { Avatar, Button, TextInput } from "react-native-paper";
import * as ScreenOrientation from "expo-screen-orientation";
import { Text } from "react-native";

export default function Auth({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else onLoginSuccess();

    setLoading(false);
  }

  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    changeScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={require("../../../assets/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>SAMDAD</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        loading={loading}
        onPress={signInWithEmail}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Sign in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    alignSelf: "center",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 5,
  },
  buttonContent: {
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
    textAlign: "center",
    color: "tomato",
  },
});
