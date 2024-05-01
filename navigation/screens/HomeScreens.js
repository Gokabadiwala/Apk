import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ImagePath from "../ImagePath/ImagePath";
import NavigationString from "../NavigationString";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Swiper from "react-native-swiper";

export default function HomeScreens({ navigation }) {
  const [data, setdata] = useState([]);
  const [array, setarray] = useState([]);
  var index;
  const [paper, setpaper] = useState(false);
  const [metal, setmetal] = useState(false);
  const [cardboard, setcardboard] = useState(false);
  const [other, setother] = useState(false);
  const [otheritem, setotheritem] = useState(false);
  const [ewaste, setewaste] = useState(false);
  const getname = async () => {
    var Token = await AsyncStorage.getItem("userToken");
    await axios
      .get(`https://kabadiwala.cyclic.app/getData/${Token}`)
      .then((res) => {
        setdata(res.data);
      });
  };

  useEffect(() => {
    getname();
  }, []);
  const handleClick = () => {
    navigation.navigate(NavigationString.SELLSCRAP, { title: array });
    setarray([]);
    setpaper(false);
    setmetal(false);
    setcardboard(false);
    setother(false);
    setotheritem(false);
    setewaste(false);
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.container}>
          <TouchableOpacity onPressOut={() => navigation.openDrawer()}>
            <FontAwesome name="navicon" style={styles.menu} />
          </TouchableOpacity>

          <Text style={styles.head}>Hii, {data.username}</Text>
          <Text style={styles.titlehead}>What Would You Like Sell?</Text>
          <View style={styles.OffSilder}>
            <Swiper
              autoplay={true}
              autoplayTimeout={5}
              activeDotColor="#009b9f"
              dotColor="#d1edee"
            >
              <View style={styles.silders}>
                <Image
                  source={ImagePath.icBanner1}
                  resizeMode="cover"
                  style={styles.ads}
                />
              </View>
              <View style={styles.silders}>
                <Image
                  source={ImagePath.icBanner1}
                  resizeMode="cover"
                  style={styles.ads}
                />
              </View>
              <View style={styles.silders}>
                <Image
                  source={ImagePath.icBanner1}
                  resizeMode="cover"
                  style={styles.ads}
                />
              </View>
            </Swiper>
          </View>
          <View style={styles.labelcontainer}>
            <Text style={styles.label}>Select Scrap Material</Text>
          </View>

          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => {
                if (array.includes("Paper")) {
                  index = array.indexOf("Paper");
                  if (index !== -1) {
                    array.splice(index, 1);
                  }
                  setpaper(!paper);
                } else {
                  array.push("Paper");
                  setpaper(!paper);
                }
              }}
              style={paper ? styles.boxact : styles.box}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={ImagePath.icPaper} style={styles.imgstyle} />
                <Text style={{ color: "#000" }}>Paper</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPressOut={() => {
                if (array.includes("Carton")) {
                  index = array.indexOf("Carton");
                  if (index !== -1) {
                    array.splice(index, 1);
                  }
                  setcardboard(!cardboard);
                } else {
                  array.push("Carton");
                  setcardboard(!cardboard);
                }
              }}
              style={cardboard ? styles.boxact : styles.box}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={ImagePath.icCardboard} style={styles.imgstyle} />
                <Text style={{ color: "#000" }}>Carton</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPressOut={() => {
                if (array.includes("Plastic")) {
                  index = array.indexOf("Plastic");
                  if (index !== -1) {
                    array.splice(index, 1);
                  }
                  setother(!other);
                } else {
                  array.push("Plastic");
                  setother(!other);
                }
              }}
              style={other ? styles.boxact : styles.box}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={ImagePath.icPlastic} style={styles.imgstyle} />
                <Text style={{ color: "#000" }}>Plastic</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (array.includes("E-waste")) {
                  index = array.indexOf("E-waste");
                  if (index !== -1) {
                    array.splice(index, 1);
                  }
                  setewaste(!ewaste);
                } else {
                  array.push("E-waste");
                  setewaste(!ewaste);
                }
              }}
              style={ewaste ? styles.boxact : styles.box}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={ImagePath.icEwaste} style={styles.imgstyle} />
                <Text style={{ color: "#000" }}>E-waste</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPressOut={() => {
                if (array.includes("Metal")) {
                  index = array.indexOf("Metal");
                  if (index !== -1) {
                    array.splice(index, 1);
                  }
                  setmetal(!metal);
                } else {
                  array.push("Metal");
                  setmetal(!metal);
                }
              }}
              style={metal ? styles.boxact : styles.box}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={ImagePath.icMetal} style={styles.imgstyle} />
                <Text style={{ color: "#000" }}>Metal</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPressOut={() => {
                if (array.includes("OtherItem")) {
                  index = array.indexOf("OtherItem");
                  if (index !== -1) {
                    array.splice(index, 1);
                  }
                  setotheritem(!otheritem);
                } else {
                  array.push("OtherItem");
                  setotheritem(!otheritem);
                }
              }}
              style={otheritem ? styles.boxact : styles.box}
            >
              <View style={{ alignItems: "center" }}>
                <Image source={ImagePath.icOtherItem} style={styles.imgstyle} />
                <Text style={{ color: "#000" }}>Other Item</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 5 }}>
              Please ensure the minimum weight is 9kg
            </Text>
          </View>
        </View>
        <View style={{ bottom: responsiveHeight(5), left: 20, width: "90%" }}>
          <TouchableOpacity
            style={array.length === 0 ? styles.btndis : styles.btn}
            disabled={array.length === 0}
            onPressIn={() => handleClick()}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Raise pickup request
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
  menu: {
    position: "absolute",
    left: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(3.5),
    width: responsiveWidth(100),
  },
  head: {
    color: "#009b9f",
    left: responsiveWidth(5),
    marginTop: responsiveHeight(10),
    fontSize: responsiveFontSize(2.5),
  },
  titlehead: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(3),
    left: responsiveWidth(5),
  },
  OffSilder: {
    left: responsiveWidth(5),
    width: responsiveWidth(90),
    height: responsiveHeight(18),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 8,
  },
  silders: {
    width: responsiveWidth(90),
    height: responsiveHeight(18),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  ads: {
    width: responsiveWidth(90),
    height: responsiveHeight(18),
    borderRadius: 8,
  },
  Butn: {
    backgroundColor: "#fff",
    fontSize: responsiveFontSize(4),
    fontWeight: "700",
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: "center",
    lineHeight: 35,
  },
  labelcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    left: responsiveWidth(5),
    marginTop: 10,
  },
  label: {
    color: "#000",
    fontWeight: "600",
    fontSize: responsiveFontSize(2),
  },
  labelview: {
    color: "#4F4F4F",
    padding: 2,
    fontWeight: "600",
    fontSize: responsiveFontSize(1.5),
  },
  boxContainer: {
    flex: 1,
    display: "flex",
    marginLeft: responsiveWidth(5),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imgstyle: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
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
  boxact: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(12),
    flexBasis: responsiveWidth(29),
    backgroundColor: "#d1edee",
    borderWidth: 0.5,
    marginRight: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    borderRadius: 5,
    borderColor: "#009b9f",
  },
  btn: {
    backgroundColor: "#009b9f",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    opacity: 1,
  },
  btndis: {
    backgroundColor: "#009b9f",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    opacity: 0.8,
  },
});
