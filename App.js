import React from "react";
import Routes from "./navigation/Routes";
import { LogBox, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar barStyle={"light-content"} hidden={false} />
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </>
  );
}