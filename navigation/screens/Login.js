import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import SafeAreaView from "react-native-safe-area-view";
import ImagePath from "../ImagePath/ImagePath";
import { StyleSheet } from "react-native";
import NavigationString from "../NavigationString";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function Login({ navigation }) {
  const [number, setnumber] = useState("");
  const [Status, setStatus] = useState(false);
  const [Loading, setLoading] = useState(false);
  var randomOTP = 0;
  var newOTP;
  const send = [];

  const handleClick = () => {
    setLoading(true);
    if (randomOTP === 0) {
      randomOTP = Math.floor(1000 * Math.random(1000) + 1000);
      newOTP = randomOTP;
    } else {
      newOTP = randomOTP;
    }
    axios
      .get(
        `https://www.fast2sms.com/dev/bulkV2?authorization=IBlKdY3XmgTxHKfzrmceFtNcNApGc4An9xbf6W5x6PJTZi6p2sOdaUEXWsPt&route=otp&variables_values=${randomOTP}&flash=0&numbers=${+number}`
      )
      .then((res) => {
        if (res.data.return) {
          send.push(+number);
          send.push(newOTP);
          ToastAndroid.show("OTP Send Successfully", ToastAndroid.SHORT);
          navigation.navigate(NavigationString.VERIFYOTP, { title: send });
        } else {
          ToastAndroid.show("Error ,Please Try Again", ToastAndroid.SHORT);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    if (number.length == 10) {
      if (
        number.charAt(0) === "9" ||
        number.charAt(0) === "8" ||
        number.charAt(0) === "7" ||
        number.charAt(0) === "6"
      ) {
        setStatus(true);
      }
    } else {
      setStatus(false);
    }
  }, [number]);

  if (Loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.container}>
          <Image source={ImagePath.icMain} style={styles.logo} />
          <Text style={styles.head}>Type your mobile number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              maxLength={10}
              onChangeText={(newnum) => setnumber(newnum)}
              value={number}
            />
          </View>
          <Text style={styles.subhead}>
            We will recogize existing customer.
          </Text>
          <TouchableOpacity
            style={Status ? styles.btn : styles.btndis}
            disabled={!Status}
            onPress={() => handleClick()}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    height: responsiveHeight(32),
  },
  head: {
    left: responsiveWidth(5),
    marginTop: responsiveHeight(4),
    fontSize: responsiveFontSize(4),
    width: responsiveWidth(90),
  },
  inputContainer: {
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    left: responsiveWidth(5),
    borderRadius: 5,
  },
  input: {
    width: responsiveWidth(90),
  },
  prefix: {
    paddingHorizontal: responsiveHeight(1),
    color: "black",
  },
  subhead: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    left: responsiveWidth(5),
  },
  btn: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(33),
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
    marginTop: responsiveHeight(33),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    opacity: 0.5,
  },
});
