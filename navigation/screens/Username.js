import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ImagePath from "../ImagePath/ImagePath";
import { StyleSheet } from "react-native";
import { AuthContext } from "../Auth/AuthContext";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function Username({ route }) {
  const { title } = route.params;
  const number = title;
  const [username, setusername] = useState("");
  const { signUp } = useContext(AuthContext);
  const [statebtn, setstatebtn] = useState(false);
  const [stateloader, setstateloader] = useState(false);

  const LoginHandle = (number, username) => {
    setstateloader(true);
    signUp(number, username).then(() => {
      setstateloader(false);
    });
  };
  useEffect(() => {
    if (username.length == 0) {
      setstatebtn(false);
    } else {
      setstatebtn(true);
    }
  });
  if (stateloader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <Image source={ImagePath.icMain} style={styles.logo} />
        <Text style={styles.head}>Type your name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            keyboardType="name-pad"
            underlineColorAndroid="transparent"
            onChangeText={(newname) => setusername(newname)}
            value={username}
          />
        </View>
        <Text style={styles.subhead}>We will recogize existing customer.</Text>
        <TouchableOpacity
          style={statebtn ? styles.btn : styles.btndis}
          disabled={!statebtn}
          onPress={() => LoginHandle(number, username)}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  head: {
    left: responsiveWidth(5),
    marginTop: responsiveHeight(4),
    fontSize: responsiveFontSize(4),
    width: responsiveWidth(90),
  },
  inputContainer: {
    left: responsiveWidth(5),
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90), //320-60
  },
  input: {
    width: responsiveWidth(90),
  },
  subhead: {
    left: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
  btn: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(38),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    left: responsiveWidth(5),
  },
  btndis: {
    left: responsiveWidth(5),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(38),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    opacity: 0.5,
  },
});
