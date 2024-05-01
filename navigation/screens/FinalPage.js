import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import SafeAreaView from "react-native-safe-area-view";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ToastAndroid } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationString from "../NavigationString";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function FinalPage({ navigation, route }) {
  const { title } = route.params;
  const [city, setcity] = useState("");
  const [area, setarea] = useState("");
  const [dataaddress, setdataaddress] = useState([]);
  const [uniqueCities, setuniqueCities] = useState([]);
  const [address, setfulladdress] = useState("");
  const [instruction, setinstruction] = useState("");
  const [id, setid] = useState(null);
  const [loading, setloading] = useState(false);
  const [pickup, setpickup] = useState({
    Home: false,
    Office: false,
    Other: false,
  });
  const [finaldata, setFinaldata] = useState({
    OrderType: "",
    OrderQuantity: "",
    OrderImg: "",
    OrderDate: "",
    OrderTime: "",
    OrderAcceptDate: "",
    UserCity: "",
    UserArea: "",
    UserAddress: "",
    UserInstruction: "",
    PickupFrom: "",
    UserId: 0,
    OrderId: 0,
  });
  var orderID = Math.floor(100000 + Math.random() * 900000);
  const getData = useCallback(async () => {
    setloading(true);
    await axios
      .get("https://kabadiwala.cyclic.app/getAddress")
      .then((res) => {
        setloading(false);
        setdataaddress(res.data);
        setuniqueCities([...new Set(res.data.map((item) => item.City))]);
      })
      .catch((err) => {
        setloading(false);
      });
  }, []);
  const Id = async () => {
    const userID = await AsyncStorage.getItem("userToken");
    setid(userID);
  };
  useEffect(() => {
    Id();
    getData();
  }, []);

  useEffect(() => {
    setFinaldata({
      ...finaldata,
      OrderType: title[0],
      OrderQuantity: title[1],
      OrderImg: title[2],
      OrderDate: title[3],
      OrderTime: title[4],
      OrderAcceptDate: title[5],
      UserId: id,
      OrderId: orderID,
      UserCity: city,
      UserArea: area,
      UserAddress: address.length > 0 ? address : "none",
      UserInstruction: instruction.length > 0 ? instruction : "none",
      PickupFrom: pickup.Home
        ? "Home"
        : pickup.Office
        ? "Office"
        : pickup.Other
        ? "Other"
        : "none",
      OrderStatus: "Pending",
    });
  }, [pickup, address, instruction]);

  const handleClick = async () => {
    try {
      setloading(true);

      const response = await axios.post(
        "https://kabadiwala.cyclic.app/sendRequest",
        { finaldata }
      );

      setloading(false);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.navigate(NavigationString.BOOKING);
    } catch (error) {
      setloading(false);
      ToastAndroid.show("Try Again, Please", ToastAndroid.SHORT);
      console.error(error);
    }
  };
  let citys = uniqueCities.map((city) => {
    return { label: city, value: city };
  });

  let areas = dataaddress
    .filter((item) => item.City === city)
    .map((item) => {
      return { label: item.Area, value: item.Area };
    });

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.container}>
            <TouchableOpacity onPressIn={() => navigation.goBack()}>
              <MaterialIcon name="arrow-back" style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.head}>Pickup Location</Text>
            {/* *******Map View******** */}
            {/* <View style={styles.mapContainer}>
              <MapView style={styles.map} region={mapRegion}>
                <Marker
                  coordinate={mapRegion}
                  flat={true}
                  title="Your Location"
                />
              </MapView>
            city area
            </View> */}

            <View style={styles.boxContainer}>
              <Text style={styles.subhead}>Select City:</Text>
              <View style={styles.inputContainer}>
                <View style={pickerSelectStyles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select city",
                      value: null,
                    }}
                    onValueChange={(value) => setcity(value)}
                    items={citys}
                  />
                </View>
              </View>
              <Text style={styles.subhead}>Select Your Area:</Text>
              <View style={styles.inputContainer}>
                <View style={pickerSelectStyles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={{ label: "Select area", value: null }}
                    onValueChange={(value) => setarea(value)}
                    items={areas}
                  />
                </View>
              </View>
              <Text style={styles.subhead}>Enter Full Address:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  name="fulladdress"
                  onChangeText={(newtext) => setfulladdress(newtext)}
                  placeholder="Address"
                />
              </View>
              <Text style={styles.subhead}>Instructions:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  name="instruction"
                  onChangeText={(newtext) => setinstruction(newtext)}
                  placeholder="Any Instruction"
                />
              </View>
              <Text style={styles.subhead}>Pickup From:</Text>
              <View style={styles.boxContainer1}>
                <TouchableOpacity
                  style={pickup.Home ? styles.boxact : styles.box}
                  onPressIn={() => setpickup({ Home: true })}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={
                        pickup.Home ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      Home
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={pickup.Office ? styles.boxact : styles.box}
                  onPressIn={() => setpickup({ Office: true })}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={
                        pickup.Office ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      Office
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={pickup.Other ? styles.boxact : styles.box}
                  onPressIn={() => setpickup({ Other: true })}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={
                        pickup.Other ? { color: "#fff" } : { color: "#000" }
                      }
                    >
                      Other
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={
              address.length > 0 &&
              (pickup.Home || pickup.Office || pickup.Other) &&
              !loading
                ? styles.btn
                : styles.btndis
            }
            disabled={
              address.length > 0 &&
              (pickup.Home || pickup.Office || pickup.Other) &&
              !loading
                ? false
                : true
            }
            onPressIn={() => handleClick()}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: responsiveHeight(100),
    backgroundColor: "#fff",
  },
  arrow: {
    fontSize: responsiveFontSize(3.5),
    position: "absolute",
    left: responsiveWidth(5),
    top: responsiveHeight(2),
  },
  head: {
    fontWeight: "500",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(8),
    width: responsiveWidth(90),
    color: "#525151",
  },
  boxContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    top: responsiveHeight(3),
  },
  // mapContainer: {
  //   left: responsiveWidth(5),
  //   top: responsiveHeight(2),
  //   width: responsiveWidth(90),
  // },
  // map: {
  //   width: responsiveWidth(90),
  //   height: responsiveHeight(25),
  // },
  subhead: {
    left: responsiveWidth(3),
    padding: 10,
    fontSize: responsiveFontSize(2.5),
    width: responsiveWidth(90),
    color: "#525151",
  },
  inputContainer: {
    left: responsiveWidth(5),
  },
  input: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderWidth: 0.5,
    borderColor: "#000",
    padding: 10,
    borderRadius: 8,
  },
  boxContainer1: {
    marginLeft: responsiveWidth(5),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(6),
    flexBasis: responsiveWidth(28),
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: responsiveWidth(2),
    marginTop: responsiveHeight(1.5),
    borderRadius: 5,
    borderColor: "#009b9f",
  },
  boxact: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(6),
    marginTop: responsiveHeight(1.5),
    flexBasis: responsiveWidth(28),
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: responsiveWidth(2),
    borderRadius: 5,
    backgroundColor: "#009b9f",
    borderColor: "#009b9f",
    borderWidth: 0,
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
  btndis: {
    width: responsiveWidth(90),
    position: "absolute",
    bottom: responsiveHeight(4),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    opacity: 0.5,
    left: responsiveWidth(5),
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    borderWidth: 0.5,
    borderRadius: 8,
    color: "black",
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderColor: "#000",
  },
});
