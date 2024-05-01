import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ToastAndroid,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import SafeAreaView from "react-native-safe-area-view";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function OrderCancle({ navigation, route }) {
  const { title } = route.params;
  const id = title;
  const [Title, setTitle] = useState("");
  const [Reason, setReason] = useState("");
  const handleClick = async () => {
    if (Title !== "" && Reason !== "") {
      await axios
        .post("https://kabadiwala.cyclic.app/updateOrder", {
          id,
          Title,
          Reason,
        })
        .then((res) => {
          ToastAndroid.show("Order Cancelled", ToastAndroid.SHORT);
          navigation.navigate("Home");
        });
    } else {
      ToastAndroid.show("Reason Please", ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.container}>
            <View style={styles.menucontainer}>
              <TouchableOpacity onPressIn={() => navigation.goBack()}>
                <MaterialIcon name="arrow-back" style={styles.menu} />
              </TouchableOpacity>
              <Text style={styles.head}>Order Detail</Text>
              <Text></Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.subhead}>Why You Want to Cancel:</Text>
              <View style={pickerSelectStyles.inputAndroid}>
                <RNPickerSelect
                  placeholder={{
                    label: "Select type",
                    value: null,
                  }}
                  onValueChange={(value) => setTitle(value)}
                  items={[
                    { label: "Already sold to other vendor", value: "Already sold to other vendor" },
                    { label: "No response from the Cleanzy", value: "No response from the Cleanzy" },
                    { label: "Not avaliable at address", value: "Not avaliable at address" },
                    { label: "Bad Behavior from Pickup Partner", value: "Bad Behavior from Pickup Partner" },
                    { label: "Pickups or schedulling issues", value: "Pickups or schedulling issues" },
                    { label: "Dissatisfied with service", value: "Dissatisfied with service" },
                    { label: "Item Unavailblity", value: "Item Unavailblity" },
                    { label: "Item Weight is lesser that 9kg", value: "Item Weight is lesser that 9kg" },
                    { label: "Other", value: "Other" }
                  ]}
                />
              </View>
              <Text style={styles.subhead}>Cancle Reason:</Text>
              <TextInput
                style={styles.inputdes}
                name="Reason"
                onChangeText={(newtext) => setReason(newtext)}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPressIn={() => handleClick()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menucontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menu: {
    fontSize: 25,
    position: "absolute",
    left: 20,
    top: 20,
  },
  head: {
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    position: "relative",
    top: 20,
  },
  boxContainer: {
    flex: 1,
    left: responsiveWidth(6),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: responsiveWidth(90),
    top: responsiveHeight(5),
  },
  subhead: {
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: responsiveFontSize(2.5),
    width: responsiveWidth(90),
    color: "#525151",
  },
  input: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderWidth: 0.5,
    borderColor: "#000",
    padding: 10,
  },
  inputdes: {
    textAlignVertical: "top",
    height: responsiveHeight(20),
    width: responsiveWidth(90),
    borderWidth: 0.5,
    borderColor: "#000",
    padding: 5,
  },
  btn: {
    width: responsiveWidth(90),
    position: "relative",
    marginTop: responsiveHeight(10),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    left: responsiveWidth(5),
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 8,
    color: "black",
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderColor: "#000",
  },
});
