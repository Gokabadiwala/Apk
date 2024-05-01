// Hooks
import React, { useEffect, useState, useMemo } from "react";
import { ActivityIndicator, View, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
// VkfepDt14D
// Navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Gesture
import "react-native-gesture-handler";
import { ToastAndroid } from "react-native";

// services
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./Auth/AuthContext";

// Routes
import TabsRoutes from "./TabsRoutes";
import CustomDrawer from "./CustomDrawer";

// Navigation
import NavigationString from "./NavigationString";

//Before Auth screens
import Login from "./screens/Login";
import VerifyOTP from "./screens/VerifyOTP";
import Username from "./screens/Username";

//After Auth screens
import SellScrap from "./screens/SellScrap";
import ConfirmDate from "./screens/ConfirmDate";
import Booking from "./screens/Booking";
import HelpAndSupport from "./screens/HelpAndSupport";
import FinalPage from "./screens/FinalPage";
import OrderCancle from "./screens/OrderCancle";
import Profile from "./screens/Profile";
import OrderDetails from "./screens/OrderDetails";
import AppInfo from "./screens/AppInfo";
// import SkeletonContent from "react-native-skeleton-content";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function RotuesMenu() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="MainHome"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name={"MainHome"} component={TabsRoutes} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

export default function Rotues() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const [userInfo, setuserInfo] = useState([]);
  const authContext = useMemo(() => ({
    signUp: async (number, username) => {
      let userToken = null;
      //Backend code
      try {
        await axios
          .post("https://kabadiwala.cyclic.app/register", { number, username })
          .then(async (res) => {
            setuserInfo(res.data);
            ToastAndroid.show("Login Success", ToastAndroid.SHORT);
            userToken = res.data._id;
            await AsyncStorage.setItem("userToken", userToken);
            dispatch({ type: "REGISTER", id: username, token: userToken });
          });
      } catch (err) {
        ToastAndroid.show("DB Response Error", ToastAndroid.SHORT);
      }
    },
    signIn: async (data) => {
      let userToken = null;
      try {
        setuserInfo(data);
        ToastAndroid.show("Login Success", ToastAndroid.SHORT);
        userToken = data._id;
        await AsyncStorage.setItem("userToken", userToken);
        dispatch({
          type: "LOGIN",
          id: data.username,
          token: userToken,
        });
      } catch (err) {
        ToastAndroid.show("DB Response Error", ToastAndroid.SHORT);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        ToastAndroid.show("User Logout", ToastAndroid.SHORT);
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "LOGOUT" });
    },
  }));
  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "REGISTER", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator
              initialRouteName={NavigationString.HOME}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={RotuesMenu} />
               <Stack.Screen name="SellScrap" component={SellScrap} />
              <Stack.Screen name="ConfirmDate" component={ConfirmDate} />
              <Stack.Screen name="Booking" component={Booking} />
              <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
              <Stack.Screen name="FinalPage" component={FinalPage} />
              <Stack.Screen name="OrderCancle" component={OrderCancle} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="OrderDetails" component={OrderDetails} />
              <Stack.Screen name="AppInfo" component={AppInfo} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              initialRouteName={NavigationString.LOGIN}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="VerifyOtp" component={VerifyOTP} />
              <Stack.Screen name="Username" component={Username} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
