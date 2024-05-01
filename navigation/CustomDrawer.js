import React, { useState, useEffect, useContext } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import NavigationString from "./NavigationString";
import { View, Text, ToastAndroid, Linking } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "./Auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function CustomDrawer(props) {
  const { signOut } = useContext(AuthContext);
  
  let Token = null;
  const [data, setdata] = useState([]);

  const getname = async () => {
    Token = await AsyncStorage.getItem("userToken");
    let res = await axios
      .get(`https://kabadiwala.cyclic.app/getData/${Token}`);
      if(res.data){
        setdata(res.data);
      }
  };
  useEffect(() => {
    getname();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#e9f8f3",
          paddingVertical: 20,
          height: 90,
        }}
      >
        <MaterialIcon
          name="account-circle"
          style={{ fontSize: 40, color: "#009b9f" }}
        ></MaterialIcon>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            position: "relative",
            left: 50,
            bottom: 40,
            color:'#009b9f'
          }}
        >
          {data.username}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            position: "relative",
            left: 50,
            bottom: 35,
          }}
        >
          {data.number}
        </Text>
      </View>
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate(NavigationString.PROFILE)}
        icon={() => (
          <MaterialIcon style={{ fontSize: 20,color:'#009b9f' }} name="account-circle" />
        )}
        labelStyle={{ color: "#000" }}
      />
      <DrawerItem
        label="Help and Support"
        onPress={() => props.navigation.navigate(NavigationString.HELPANDSUPPORT)}
        icon={() => (
          <MaterialIcon style={{ fontSize: 20 ,color:'#009b9f'}} name="help" />
        )}
        labelStyle={{ color:'#000' }}
      />
      <DrawerItem
        label="How it's Work"
        onPress={() => Linking.openURL('https://youtube.com/shorts/Ssr-C9wLpc4?feature=share4')}
        icon={() => (
          <MaterialIcon style={{ fontSize: 20,color:'#009b9f' }} name="contact-page" />
        )}
        labelStyle={{ color:'#000' }}
      />
      <DrawerItem
        label="App Info"
        onPress={() => props.navigation.navigate(NavigationString.APPINFO)}
        icon={() => (
          <MaterialIcon style={{ fontSize: 20,color:'#009b9f' }} name="info" />
        )}
        labelStyle={{ color:'#000' }}
      />

      <DrawerItem
        label="Logout"
        onPress={() => {
          signOut();
        }}
        icon={() => <MaterialIcon style={{ fontSize: 20,color:'#009b9f' }} name="logout" />}
        labelStyle={{ color: "#000" }}
      />
    </DrawerContentScrollView>
  );
}
