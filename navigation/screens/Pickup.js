import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationString from "../NavigationString";
export default function Pickup({ navigation }) {
  const [data, setdata] = useState([]);
  var Token = "";
  const handleClick = () => {
    navigation.openDrawer();
  };
  const getData = async () => {
    Token = await AsyncStorage.getItem("userToken");
    await axios
      .get(`https://kabadiwala.cyclic.app/pickup/${Token}`)
      .then((res) => {
        setdata(res.data);
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <View style={styles.menucontainer}>
          <TouchableOpacity onPressIn={handleClick}>
            <FontAwesome name="navicon" style={styles.menu} />
          </TouchableOpacity>
          <Text style={styles.head}>History</Text>
          <Text></Text>
        </View>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          <View style={styles.boxContainer}>
            {data.length > 0 ? (
              data.map((item) => {
                return (
                  <View style={styles.box} key={item._id}>
                    <TouchableOpacity
                      style={styles.touch}
                      onPress={() =>
                        navigation.navigate(NavigationString.ORDERDETAILS, {
                          title: item._id,
                        })
                      }
                    >
                      <Text style={styles.date}>{item.OrderAcceptDate}</Text>
                      <MaterialIcon
                        name="navigate-next"
                        style={styles.arrowbtn}
                      />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <Text style={styles.order}>Order ID : {item.OrderId}</Text>
                    <Text style={styles.status}>
                      <Text style={styles.st}>Staus:</Text>
                      <Text
                        style={
                          item.OrderStatus === "Pending"
                            ? { color: "orange" }
                            : item.OrderStatus === "Accepted"
                            ? { color: "green" }
                            : item.OrderStatus === "Completed"
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {" "}
                        {item.OrderStatus}
                      </Text>
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.notOrder}>You Have Not Place Any Order</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
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
    width: responsiveWidth(100),
  },
  head: {
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    position: "relative",
    top: 20,
  },
  boxContainer: {
    flex: 1,
    display: "flex",
    marginTop: responsiveHeight(2.5),
    left: responsiveWidth(5),
    width: responsiveWidth(90),
    flexDirection: "column",
    marginBottom: responsiveHeight(8),
  },
  box: {
    backgroundColor: "#fff",
    height: responsiveHeight(13),
    flexBasis: responsiveWidth(27),
    marginTop: responsiveHeight(2),
    borderRadius: 1,
    borderWidth: 0.1,
    borderColor: "#000",
  },
  touch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowbtn: {
    fontSize: responsiveFontSize(3.5),
    top: 2,
  },
  date: {
    fontSize: responsiveFontSize(2.8),
    left: responsiveWidth(2),
  },
  order: {
    fontSize: responsiveFontSize(2),
    left: responsiveWidth(2),
  },
  status: {
    left: responsiveWidth(2),
  },
  st: {
    fontSize: responsiveFontSize(2),
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  notOrder: {
    fontSize: responsiveFontSize(3),
    display: "flex",
    padding: 20,
    marginTop: responsiveHeight(30),
    textAlign: "center",
    alignSelf: "center",
  },
});
