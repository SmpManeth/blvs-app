import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import DocumentListScreen from "../screens/DocumentListScreen";
import DocumentViewScreen from "../screens/DocumentViewScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="DocumentList" component={DocumentListScreen} />
        <Stack.Screen name="DocumentView" component={DocumentViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
