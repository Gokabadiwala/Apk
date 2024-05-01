import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCallback } from "react";

export default function Profile({ navigation }) {
  const [data, setdata] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setloading] = useState(false);
  var getdate, mon, year;

  const getname = useCallback(async () => {
    setloading(true);
    var Token = await AsyncStorage.getItem("userToken");
    await axios
    .get(`https://kabadiwala.cyclic.app/getData/${Token}`)
    .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
      });
  }, []);

  useEffect(() => {
    getname();
  }, []);

  const handleChange = (value) => {
    setdata({ ...data, username: value });
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleGender = (gender) => {
    setdata({ ...data, genderValue: gender });
  };

  const handleConfirm = (date) => {
    getdate = date.getDate();
    mon = date.getMonth() + 1;
    year = date.getFullYear();
    setdata({ ...data, DateOfBirth: getdate + "/" + mon + "/" + year });
    hideDatePicker();
  };

  const handleClick = async () => {
    await axios
      .put(`https://kabadiwala.cyclic.app/updateProfile`, data)
      .then((res) => {
        ToastAndroid.show("Profile Updated Successful", ToastAndroid.SHORT);
        getname();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
              <Text style={styles.head}>Bio Data</Text>
              <Text></Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.profileImg}>
                <MaterialIcon
                  name="account-circle"
                  style={styles.accountCircle}
                ></MaterialIcon>
                <Text style={styles.profilehead}>{data.username}</Text>
                <Text style={styles.profilesubhead}>{data.number}</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  name="username"
                  onChangeText={(newtext) => handleChange(newtext)}
                  placeholder="What's your full name?"
                  value={data.username ? data.username : "none"}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.prefix}>+91</Text>
                <TextInput
                  style={styles.inputnum}
                  value={"" + data.number}
                  editable={false}
                />
              </View>

              <View style={pickerSelectStyles.inputAndroid}>
                <RNPickerSelect
                  placeholder={{
                    label:  "Select Gender",
                    value:  null,
                  }}
                  value={data.gender ? data.gender : ""}
                  onValueChange={(value) => handleGender(value)}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Prefer Not to Say", value: "neutral" }
                  ]}
                />
              </View>

              <View style={[styles.inputContainer,{display:'none'}]}>
                <TextInput
                  style={styles.input}
                  value={data.DateOfBirth ? data.DateOfBirth : "none"}
                  onPressIn={showDatePicker}
                  placeholder="What is your date of birth?"
                />
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                // date={date}
                name="date"
                onDateChange={handleChange}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <TouchableOpacity
              style={loading ? styles.btndis : styles.btn}
              disabled={loading}
              onPressIn={() => handleClick()}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Update Profile
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
    backgroundColor: "#fff",
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
  profilehead: {
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    position: "relative",
    top: 20,
  },
  profilesubhead: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
    position: "relative",
    top: 25,
    marginBottom: responsiveHeight(5),
  },
  profileImg: {
    display: "flex",
    width: responsiveWidth(90),
  },
  accountCircle: {
    fontSize: responsiveFontSize(15),
    color: "#000",
    textAlign: "center",
    color: "#009b9f",
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
    top: responsiveHeight(3),
  },
  subhead: {
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: responsiveFontSize(2.5),
    width: responsiveWidth(90),
    color: "#525151",
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: "#B7B7B7",
    backgroundColor: "#fff",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    borderRadius: 10,
  },
  input: {
    width: responsiveWidth(90),
    borderColor: "#B7B7B7",
    height: 50,
  },
  inputnum: {
    width: responsiveWidth(90),
    borderColor: "#B7B7B7",
    height: 50,
    color: "#000",
  },
  prefix: {
    paddingHorizontal: responsiveHeight(1),
    color: "black",
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
  btndis: {
    width: responsiveWidth(90),
    position: "relative",
    marginTop: responsiveHeight(10),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    left: responsiveWidth(5),
    opacity: 0.8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    display:'none',
    borderWidth: 0.5,
    borderRadius: 8,
    color: "black",
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderColor: "#B7B7B7",
    marginTop: responsiveHeight(2),
    backgroundColor: "#fff",
  },
});
