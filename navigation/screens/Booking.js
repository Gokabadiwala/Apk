import React from "react";
import { Image, View, TouchableOpacity, StatusBar, Text } from "react-native";
import { StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ImagePath from "../ImagePath/ImagePath";
import NavigationString from "../NavigationString";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
export default function Booking({ navigation }) {
  const handleClick = () => {
    navigation.navigate(NavigationString.HOME);
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.container}>
          <TouchableOpacity onPressIn={() => navigation.popToTop()}>
            <MaterialIcon
              name="arrow-back"
              style={{ fontSize: 25, position: "absolute", left: 20, top: 20 }}
            />
          </TouchableOpacity>
          <Image style={styles.image} source={ImagePath.icConfirm} />
          <View>
            <Text style={styles.head1}>
              your pickup request has been placed
            </Text>
            <Text style={styles.head2}>
              Please wait 5 to 10 min to see a new status update
            </Text>
            <Text style={styles.head3}>Thank you ! </Text>
          </View>
          <TouchableOpacity style={styles.btn} onPressIn={() => handleClick()}>
            <Text style={{ textAlign: "center", color: "white" }}>Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: "center",
    top: responsiveHeight(10),
    flex: 0,
  },
  head1: {
    width: responsiveWidth(100),
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(15),
    fontWeight: "500",
  },
  head2: {
    width: responsiveWidth(80),
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "400",
    marginTop: responsiveHeight(5),
  },
  head3: {
    width: responsiveWidth(100),
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
    marginTop: responsiveHeight(2),
  },
  btn: {
    width: responsiveWidth(90),
    position: "absolute",
    bottom: responsiveHeight(4),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    left: responsiveWidth(5),
  },
});
