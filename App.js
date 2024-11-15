import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Keyboard, Animated } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

// Import custom screens
import Home from "./screens/home";
import Profile from "./screens/profile";
import Splash from "./screens/splash";
import Login from "./screens/login";
import Maps from "./screens/maps";
import Promo from "./screens/promo";
import PromoDetail from "./screens/promodetail";
import Motor from "./screens/motor";
import Mobil from "./screens/mobil";
import Minibus from "./screens/minibus";
import History from "./screens/history";
import HistoryDetail from "./screens/historydetail";
import Settings from "./screens/settings";
import NomorPonsel from "./screens/nomorponsel";
import Language from "./screens/language";
import Tanggal from "./screens/tanggal";

// Navigator Declaration
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const noHead = { headerShown: false };

// Custom button for the middle tab
const CustomTabBarButton = ({ children, onPress }) => {
  const [scale] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity
      style={styles.centralTabButtonContainer}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.centralTabButton, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Bottom Tabs Navigator
const Tabs = ({ keyboardVisible }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "History":
              iconName = focused ? "clipboard" : "clipboard-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "home-outline"; // Fallback icon
          }
          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? "#A7E92F" : "#B0B0B0"}
            />
          );
        },
        tabBarStyle: [
          styles.tabBarStyle,
          keyboardVisible && { display: "none" }, // Hide tab bar when keyboard is visible
        ],
        tabBarLabel: ({ focused }) => (
          <Text
            style={[styles.tabBarLabel, { color: focused ? "#A7E92F" : "#B0B0B0" }]}
          >
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} options={noHead} />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Ionicons name="clipboard" size={35} color="white" />
              <Text alignSelf={"center"} color={"white"} style={styles.textIcon}>
                History
              </Text>
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile} options={noHead} />
    </Tab.Navigator>
  );
};

// Main App component with Stack Navigator
const App = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={noHead} />
          <Stack.Screen name="Login" component={Login} options={noHead} />
          <Stack.Screen name="Tabs" options={{ headerShown: false }}>
            {(props) => <Tabs {...props} keyboardVisible={keyboardVisible} />}
          </Stack.Screen>
          <Stack.Screen name="Profile" component={Profile} options={noHead} />
          <Stack.Screen name="Promo" component={Promo} options={noHead} />
          <Stack.Screen name="PromoDetail" component={PromoDetail} options={noHead} />
          <Stack.Screen name="Motor" component={Motor} options={noHead} />
          <Stack.Screen name="Mobil" component={Mobil} options={noHead} />
          <Stack.Screen name="Minibus" component={Minibus} options={noHead} />
          <Stack.Screen name="HistoryDetail" component={HistoryDetail} options={noHead} />
          <Stack.Screen name="Settings" component={Settings} options={noHead} />
          <Stack.Screen name="NomorPonsel" component={NomorPonsel} options={noHead} />
          <Stack.Screen name="Language" component={Language} options={noHead} />
          <Stack.Screen name="Tanggal" component={Tanggal} options={noHead} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#24a8e0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  centralTabButtonContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    ...this.shadow,
  },
  centralTabButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#A7E92F",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ffffff",
    elevation: 5, // Added elevation for Android shadow
  },
  textIcon: {
    marginTop: -5,
    color: "white",
    fontSize: 12,
  },
  tabBarStyle: {
    height: 80,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    borderRadius: 15,
    elevation: 10, // Subtle shadow effect for better tab bar visibility
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '600', // Bolder font for better legibility
  },
});
