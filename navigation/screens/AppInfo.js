import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Terms and Conditions",
    url: "https://gokabadiwala.com/terms.php",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Privacy Policy",
    url: "https://gokabadiwala.com/privacy-policy.php",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "F&Q",
    url: "https://gokabadiwala.com/faq.php",
  },
];

const Item = ({ title, url }) => (
  <TouchableOpacity style={styles.item} onPressIn={() => Linking.openURL(url)}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const AppInfo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <TouchableOpacity onPressIn={() => navigation.goBack()}>
        <MaterialIcon name="arrow-back" style={styles.arrow} />
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} url={item.url} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
  item: {
    backgroundColor: "#fff",
    borderColor: "#009b9f",
    borderWidth: 0.5,
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    color: "#000",
  },
  arrow: {
    fontSize: responsiveFontSize(3.5),
    position: "relative",
    marginBottom: responsiveHeight(5),
    left: responsiveWidth(5),
    top: responsiveHeight(2),
  },
});

export default AppInfo;
