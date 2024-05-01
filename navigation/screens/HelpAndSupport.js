import React from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function HelpAndSupport({ navigation }) {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.container}>
          <TouchableOpacity onPressIn={() => navigation.goBack()}>
            <MaterialIcon name="arrow-back" style={styles.menu} />
          </TouchableOpacity>
          <Text style={styles.head}>Help And Support</Text>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => Linking.openURL(`tel:9713842004`)}
            >
              <MaterialCommunityIcon style={styles.icon} name="phone" />
              <Text>Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() =>
                Linking.openURL("mailto: contact@gokabadiwala.com")
              }
            >
              <MaterialCommunityIcon style={styles.icon} name="email" />
              <Text>Mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => Linking.openURL("https://wa.me/9713842004")}
            >
              <MaterialCommunityIcon style={styles.icon} name="whatsapp" />
              <Text>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    fontSize: 25,
    position: "absolute",
    left: 20,
    top: 20,
  },
  head: {
    marginTop: responsiveHeight(10),
    textAlign: "center",
    fontSize: responsiveFontSize(3),
  },
  boxContainer: {
    flex: 1,
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(5),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(12),
    flexBasis: responsiveWidth(29),
    borderWidth: 0.5,
    marginRight: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    borderRadius: 5,
    borderColor: "#009b9f",
  },
  icon: {
    fontSize: responsiveFontSize(3.5),
  },
});
