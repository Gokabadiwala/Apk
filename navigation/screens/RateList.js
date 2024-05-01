import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import _debounce from "lodash.debounce";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const API_URL = "https://kabadiwala.cyclic.app/getAllRateList";

const RateList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data: responseData } = await axios.get(API_URL);
      setData(responseData);
      setDistinctCategories([
        ...new Set(responseData.map((item) => item.Category)),
      ]);
    } catch (error) {
      console.error("What is the error"+error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(fetchData, 5000);
    return () => clearInterval(fetchDataInterval);
  }, [fetchData]);

  const debouncedSearch = _debounce(setSearchQuery, 300);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.box} key={item._id}>
      <View style={styles.viewcenter}>
        <Image source={{ uri: item.Rateicon }} style={styles.imgicon} />
        <Text>{item.ItemName}</Text>
        <Text>{`${item.Price} ₹/Kg`}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item: category }) => (
    <View>
      <Text style={styles.subhead}>{category}</Text>
      <View style={styles.boxContainer}>
        <FlatList
          horizontal
          data={filteredData.filter((item) => item.Category === category)}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          extraData={filteredData}
        />
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <Text style={styles.noDataText}>No Data Found</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableOpacity onPressIn={() => navigation.openDrawer()}>
          <FontAwesome name="navicon" style={styles.menu} />
        </TouchableOpacity>
        <Text style={styles.head}>Today Scrap Price List</Text>
        <Text style={styles.subhead}>
          Price may fluctuate because of the recycling industry
        </Text>

        <View style={styles.searchSection}>
          <MaterialIcon
            name="search"
            style={styles.searchIcon}
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Search any scrap item like ..."
            underlineColorAndroid="transparent"
            onChangeText={debouncedSearch}
          />
        </View>

        <FlatList
          data={distinctCategories}
          keyExtractor={(category) => category}
          renderItem={renderCategory}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

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
    fontWeight: "500",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(10),
    width: responsiveWidth(98),
    color: "#525151",
  },
  viewcenter: {
    alignItems: "center",
  },
  subhead: {
    fontSize: responsiveFontSize(2),
    left: responsiveWidth(5),
    color: "#757575",
    width: responsiveWidth(90),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(0.5),
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    width: responsiveWidth(90),
    left: responsiveWidth(6),
    borderColor: "#000",
    height: responsiveHeight(5),
    borderRadius: 5,
    margin: responsiveWidth(1),
    marginTop: responsiveWidth(0.5),
  },
  imgicon: {
    width: 30,
    height: 30,
  },
  searchIcon: {
    padding: 10,
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    left: responsiveWidth(5),
    fontSize: responsiveFontSize(3),
    resizeMode: "stretch",
    alignItems: "center",
  },
  input: {
    left: responsiveWidth(5),
    height: responsiveHeight(5),
    width: responsiveWidth(100),
    borderRadius: 5,
  },
  boxContainer: {
    display: "flex",
    left: responsiveWidth(5),
    flexDirection: "row",
    flexWrap: "nowrap",
    marginRight: responsiveWidth(5),
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    width: responsiveWidth(28),
    height: responsiveHeight(12),
    flexBasis: responsiveWidth(27),
    borderColor: "#009b9f",
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  noDataText: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default RateList;
