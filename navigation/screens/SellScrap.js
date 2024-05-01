import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import NavigationString from "../NavigationString";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";

export default function SellScrap({ navigation, route }) {
  const { title } = route.params;
  const [image, setImage] = useState(null);
  const [len, setlen] = useState(0);
  const [data, setdata] = useState("");
  const [img, setimg] = useState(true);
  const [dbdata, setdbdata] = useState([]);
  const [Loading, setLoading] = useState(true);
  const getData = async () => {
    await axios
      .get("https://kabadiwala.cyclic.app/getAllQuantity")
      .then((res) => {
        setLoading(false);
        setdbdata(res.data);
        setlen(res.data.length);
      })
      .catch((err) => {
        setLoading(false);
        ToastAndroid.show("Something Wrong, Try Again", ToastAndroid.SHORT);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const showImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setimg(false);
        setImage(result.assets[0].uri);
      }
  };

  function handleClick() {
    var send = null;
    if (image != null) {
      send = [title, data, image];
    } else {
      send = [title, data, false];
    }
    navigation.navigate(NavigationString.CONFIRMDATE, { title: send });
  }
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
        <TouchableOpacity onPressIn={() => navigation.goBack()}>
          <MaterialIcon name="arrow-back" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.head}>Select Item Material</Text>
        <Text style={styles.subhead}>Approx Weight</Text>
        <View style={styles.boxContainer}>
          {dbdata.map((item) => {
            return (
              <TouchableOpacity
                key={item._id}
                style={item.QuantityItem === data ? styles.boxact : styles.box}
                onPress={() => {
                  setdata(item.QuantityItem);
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={
                      item.QuantityItem === data
                        ? { color: "white", width: responsiveWidth(21) }
                        : { color: "black", width: responsiveWidth(21) }
                    }
                  >
                    {item.QuantityItem + " Kg"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {/* <TouchableOpacity
                  onPress={() =>
                    setTwo(true) ||
                    setOne(false) ||
                    setThree(false) ||
                    setdata(item.MiddleQuantity)
                  }
                  style={two ? styles.boxact : styles.box}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={two ? { color: "white" } : { color: "black" }}>
                      {item.MiddleQuantity + ' Kg'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={three ? styles.boxact : styles.box}
                  onPress={() =>
                    setThree(true) ||
                    setOne(false) ||
                    setTwo(false) ||
                    setdata(item.EndQuantity)
                  }
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={three ? { color: "white" } : { color: "black" }}>
                      {item.EndQuantity + ' Kg'}
                    </Text>
                  </View>
                </TouchableOpacity> */}
        </View>
        <View style={styles.separator(len)} />
        <View style={styles.upload}>
          {img ? (
            <>
              <TouchableOpacity onPressIn={() => showImagePicker()}>
                <MaterialCommunityIcon name="image-plus" style={styles.img} />
              </TouchableOpacity>
              <Text style={styles.desc}>
                Upload Scrap Item Picture This Will Help us identify Your Scrap
                Item Better
              </Text>
            </>
          ) : (
            <Image source={{ uri: image }} style={styles.disimg} />
          )}
        </View>

        <TouchableOpacity
          style={data ? styles.btn(img) : styles.btndis(img)}
          disabled={data ? false : true}
          onPressIn={() => handleClick()}
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
    marginTop: responsiveHeight(10),
    width: responsiveWidth(90),
    color: "#525151",
  },
  subhead: {
    fontSize: responsiveFontSize(2.5),
    left: responsiveWidth(5),
    color: "#757575",
  },
  boxContainer: {
    flex: 1,
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
    marginTop: responsiveHeight(2),
    borderRadius: 5,
    borderColor: "#009b9f",
  },

  boxact: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(6),
    flexBasis: responsiveWidth(28),
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    borderRadius: 5,
    backgroundColor: "#009b9f",
    borderColor: "#009b9f",
  },

  separator: (len) => ({
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    top: responsiveHeight(10),
    flex: 1,
    marginTop:
      len > 6
        ? responsiveHeight(16)
        : len > 3
        ? responsiveHeight(8)
        : responsiveHeight(0),
  }),
  upload: {
    flex: 1000,
    flexDirection: "row",
    // display:'none'
  },

  img: {
    fontSize: responsiveFontSize(5),
    color: "#009b9f",
    top: responsiveHeight(10),
    left: responsiveWidth(5),
  },
  desc: {
    fontSize: 15,
    maxWidth: responsiveWidth(75),
    top: responsiveHeight(10),
    left: responsiveWidth(8),
  },
  disimg: {
    width: responsiveWidth(90),
    height: responsiveHeight(25),
    left: responsiveWidth(5),
    marginVertical: responsiveHeight(10),
  },
  btnbox: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  btn: (img) => ({
    width: responsiveWidth(90),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    bottom: responsiveHeight(4),
    left: responsiveWidth(5),
  }),
  btndis: (img) => ({
    width: responsiveWidth(90),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    opacity: 0.5,
    bottom: responsiveHeight(4),
    left: responsiveWidth(5),
  }),
});
