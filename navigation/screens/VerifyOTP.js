import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ImagePath from "../ImagePath/ImagePath";
import NavigationString from "../NavigationString";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

export default function VerifyOTP({ navigation, route }) {
  const { title } = route.params;
  const number = title[0];
  const getOTP = title[1];
  const { signIn } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.fast2sms.com/dev/bulkV2?authorization=IBlKdY3XmgTxHKfzrmceFtNcNApGc4An9xbf6W5x6PJTZi6p2sOdaUEXWsPt&route=otp&variables_values=${getOTP}&flash=0&numbers=${number}`
      );

      if (res.data.return) {
        setLoading(false);
        setCountdown(60);
        ToastAndroid.show("OTP Resend Successfully", ToastAndroid.SHORT);
      } else {
        setLoading(false);
        setCountdown(60);
        ToastAndroid.show("Error ,Please Try Again", ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handlePress = async () => {
    setLoading(true);
    try {
      if (+value === getOTP) {
        await axios
          .post("https://kabadiwala.cyclic.app/Login", { number })
          .then((res) => {
            console.log(res.data);
            setLoading(false);
            if (res.data.vaild === true) {
              signIn(res.data.check, res.data.token).then(setLoading(true));
            } else {
              ToastAndroid.show("OTP Verified", ToastAndroid.SHORT);
              navigation.navigate(NavigationString.USERNAME, { title: number });
            }
          });
      } else {
        ToastAndroid.show("Please Check Your OTP", ToastAndroid.SHORT);
        setValue("");
        setLoading(false);
      }
    } catch {
      setLoading(false);
      setValue("");
    }
  };
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

      <View style={styles.container}>
        <Image source={ImagePath.icMain} style={styles.logo} />
        <Text style={styles.head}>Type your OTP </Text>
        <View style={styles.inputContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <Text style={styles.subhead}>
          We have sent OTP to your mobile number
        </Text>
        {countdown > 0 ? (
          <Text style={styles.subhead}>Resend OTP in {countdown} seconds</Text>
        ) : (
          <Text style={styles.subhead} onPress={handleResendOtp}>
            Resend OTP
          </Text>
        )}

        <TouchableOpacity
          style={!Loading ? styles.btn : styles.btndis}
          disabled={Loading}
          onPress={handlePress}
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
  subhead: {
    left: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },

  inputContainer: {
    left: responsiveWidth(5),
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: responsiveWidth(15),
    backgroundColor: "#fff",
    color: "black",
    padding: responsiveWidth(5),
    borderWidth: 0.5,
    marginRight: 10,
    marginTop: responsiveHeight(2),
    textAlign: "center",
    borderRadius: 5,
  },
  btn: {
    left: responsiveWidth(5),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(34),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
  },
  btndis: {
    left: responsiveWidth(5),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(34),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    opacity: 0.5,
  },
  cellRoot: {
    width: responsiveWidth(15),
    height: responsiveHeight(8),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 10,
    marginRight: 10,
  },
  cellText: {
    color: "#000",
    fontSize: responsiveFontSize(3),
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
});
