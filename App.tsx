import "react-native-url-polyfill/auto";
import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Auth from "./src/components/login/Auth";
import { useAuth } from "./src/hooks/useAuth";
import DDosenScreen from "./src/screen/DDosenScreen";
import DMataKuliahScreen from "./src/screen/DMataKuliahScreen";
import { RootStackParamList } from "./src/types/types"; // Import the defined types

const Stack = createStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

export default function App() {
  const { session, email, handleLoginSuccess, handleLogout } = useAuth();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!session ? (
            <Stack.Screen name="Auth">
              {(props) => (
                <Auth {...props} onLoginSuccess={handleLoginSuccess} />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="DDosenScreen">
                {(props) => (
                  <DDosenScreen
                    {...props}
                    email={email}
                    handleLogout={handleLogout}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="DMataKuliahScreen"
                component={DMataKuliahScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
