import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import NavigationString from "../NavigationString";
import axios from "axios";
export default function OrderDetails({ navigation, route }) {
  const { title } = route.params;
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const getdata = useCallback(async () => {
    setLoading(true);
    axios
      .get(`https://kabadiwala.cyclic.app/getpickupdetails/${title}`)
      .then((res) => {
        setdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [title]);

  useEffect(() => {
    getdata();
  }, []);

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
        <View style={styles.container}>
          <View style={styles.menucontainer}>
            <TouchableOpacity onPressIn={() => navigation.goBack()}>
              <MaterialIcon name="arrow-back" style={styles.menu} />
            </TouchableOpacity>
            <Text style={styles.head}>Order Detail</Text>
            <Text></Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHead}>Order Detail</Text>
            <View style={styles.componets}>
              <View style={styles.title}>
                <Text>Order ID</Text>
                <Text style={{ marginRight: responsiveWidth(3) }}>Status</Text>
              </View>
              <View style={styles.content}>
                <Text style={{ fontWeight: "bold" }}>#{data.OrderId}</Text>
                <Text
                  style={
                    data.OrderStatus === "Pending"
                      ? {
                          fontWeight: "bold",
                          backgroundColor: "orange",
                          color: "#fff",
                          padding: 3,
                        }
                      : data.OrderStatus === "Completed"
                      ? {
                          fontWeight: "bold",
                          backgroundColor: "green",
                          color: "#fff",
                          padding: 3,
                        }
                      : data.OrderStatus === "Accepted"
                      ? {
                          fontWeight: "bold",
                          backgroundColor: "green",
                          color: "#fff",
                          padding: 3,
                        }
                      : {
                          fontWeight: "bold",
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 3,
                        }
                  }
                >
                  {data.OrderStatus}
                </Text>
              </View>
            </View>
            <View style={styles.componets}>
              <View style={styles.title}>
                <Text>Order Raise</Text>
                <Text style={{ marginRight: responsiveWidth(-4) }}>
                  Payment Type
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={{ fontWeight: "bold" }}>
                  {data.OrderAcceptDate}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginRight: responsiveWidth(5),
                  }}
                >
                  Cash
                </Text>
              </View>
            </View>
            <View style={styles.componets}>
              <View style={styles.title}>
                <Text>Select Pickup date</Text>
                <Text style={{ marginLeft: responsiveWidth(20) }}>
                  Select Time Slot
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={{ fontWeight: "bold" }}>{data.OrderDate}</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginRight: responsiveWidth(-5),
                  }}
                >
                  {data.OrderTime}
                </Text>
              </View>
              <View style={styles.separator} />
            </View>
            <View style={styles.componets}>
              <View style={styles.title}>
                <Text>Scrap item</Text>
                <Text style={{ marginRight: responsiveWidth(-8) }}>
                  Item weight lies
                </Text>
              </View>
              <View style={styles.content}>
                <Text
                  style={{ fontWeight: "bold", width: responsiveWidth(30) }}
                >
                  {data.OrderType + " "}
                </Text>
                <Text style={{ fontWeight: "bold" }}>{data.OrderQuantity}</Text>
              </View>
              <View style={styles.separator} />
            </View>

            <View style={styles.componets}>
              <View style={styles.title}>
                <Text>Address-Home</Text>
                <Text style={{ marginRight: responsiveWidth(-8) }}></Text>
              </View>
              <View style={styles.content}>
                <Text style={{ fontWeight: "bold", padding: 10 }}>
                  <MaterialIcon name="my-location" /> {data.UserAddress + ", "}{" "}
                  {data.UserArea + ", "} {data.UserCity}
                </Text>
              </View>
            </View>
          </View>

          {data.OrderStatus !== "Cancelled" ? (
            <View style={styles.btncontainer}>
              <TouchableOpacity
                style={styles.btn}
                onPressIn={() =>
                  navigation.navigate(NavigationString.ORDERCANCLE, {
                    title: data._id,
                  })
                }
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Request Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPressIn={() =>
                  navigation.navigate(NavigationString.HELPANDSUPPORT)
                }
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Need Help
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btncontainer}>
              <TouchableOpacity
                style={styles.btnhelp}
                onPressIn={() =>
                  navigation.navigate(NavigationString.HELPANDSUPPORT)
                }
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Need Help
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    borderWidth: 0.5,
    left: responsiveWidth(6),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ffffff",
    maxHeight: responsiveHeight(60),
    width: responsiveWidth(90),
    top: responsiveHeight(5),
  },
  boxHead: {
    padding: 20,
    fontSize: responsiveFontSize(2.5),
    color: "#009b9f",
    width: responsiveWidth(80),
  },
  componets: {
    padding: 10,
    width: responsiveWidth(80),
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    color: "#525151",
    opacity: 0.8,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    fontWeight: "800",
    color: "#000",
  },
  separator: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    top: responsiveHeight(3),
    width: responsiveWidth(85),
    flex: 1,
    marginBottom: responsiveHeight(2),
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    width: responsiveWidth(90),
    left: responsiveWidth(5),
  },
  btn: {
    width: responsiveWidth(44),
    position: "relative",
    marginTop: responsiveHeight(10),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  btnhelp: {
    width: responsiveWidth(90),
    position: "relative",
    marginTop: responsiveHeight(10),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
});
