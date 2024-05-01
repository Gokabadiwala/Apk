import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NavigationString from "../NavigationString";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
export default function ConfirmDate({ navigation, route }) {
  const { title } = route.params;
  const [dbdata, setdbdata] = useState([]);
  const getData = useCallback(async () => {
    await axios
      .get("https://kabadiwala.cyclic.app/getAllTime")
      .then((res) => {
        setLoading(false);
        setdbdata(res.data);
      })
      .catch((err) => {
        setLoading(false);
        ToastAndroid.show("Something Wrong, Try Again", ToastAndroid.SHORT);
      });
  }, []);

  useEffect(() => {
    getData();
  }, []);
  const [Loading, setLoading] = useState(true);
  const [state, setState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [todaydate, settodaydate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, settime] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(date);
    setState(true);
  };

  const data = date.getDate();
  const mon = date.getMonth() + 1;
  const year = date.getFullYear();
  var month = "";
  switch (mon) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
    default:
      month = "Error";
  }
  const fulldate = data + " " + month + " " + year;

  var daya = date.getDay();
  let day = "";
  switch (daya) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thurday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "Error";
  }
  const todayday = todaydate.getDate();
  const todaymon = todaydate.getMonth() + 1;
  const todayyear = todaydate.getFullYear();
  var months = "";
  switch (todaymon) {
    case 1:
      months = "Jan";
      break;
    case 2:
      months = "Feb";
      break;
    case 3:
      months = "March";
      break;
    case 4:
      months = "April";
      break;
    case 5:
      months = "May";
      break;
    case 6:
      months = "June";
      break;
    case 7:
      months = "July";
      break;
    case 8:
      months = "Aug";
      break;
    case 9:
      months = "Sep";
      break;
    case 10:
      months = "Oct";
      break;
    case 11:
      months = "Nov";
      break;
    case 12:
      months = "Dec";
      break;
    default:
      months = "Error";
  }
  const newtodaydate = todayday + " " + months + " " + todayyear;
  
  function handleClick() {
    const send = title.concat(fulldate, time ? time : false, newtodaydate);
    navigation.navigate(NavigationString.FINALPAGE, { title: send });
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

        <Text style={styles.head}>Select a date for scrap pickup</Text>
        <View style={styles.boxContainer}>
          <TouchableOpacity onPressIn={showDatePicker}>
            <View style={styles.datebox1}>
              <View style={styles.datebox}>
                <Text style={styles.day}>{day}</Text>
                <MaterialCommunityIcon
                  name="chevron-down"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.date}>{fulldate}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.boxContainer1}>
          {dbdata.map((item) => {
            return (
              <TouchableOpacity
                key={item._id}
                style={item.TimeItem === time ? styles.boxact : styles.box}
                onPress={() => settime(item.TimeItem)}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={
                      item.TimeItem === time
                        ? { color: "#fff" }
                        : { color: "#000" }
                    }
                  >
                    {item.TimeItem}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <Text style={styles.subhead}>
            Pickup time between 10 am - 6 pm. Our pickup exective will call you
            before coming
          </Text>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date}
          onDateChange={setDate}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity
          style={state ? styles.btn : styles.btndis}
          disabled={!state}
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
    fontSize: responsiveFontSize(2),
    color: "#757575",
    marginTop: responsiveHeight(2),
    maxWidth: responsiveWidth(90),
  },
  boxContainer: {
    flex: 1,
    display: "flex",
    marginLeft: responsiveWidth(5),
    flexDirection: "row",
  },
  datebox1: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    borderColor: "#009b9f",
    borderWidth: 1.5,
    height: responsiveHeight(10),
  },
  datebox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    fontSize: responsiveFontSize(2.5),
    color: "#009b9f",
    fontWeight: "600",
    padding: 5,
  },
  icon: {
    fontSize: responsiveFontSize(5),
    position: "relative",
    padding: 10,
    color: "#009b9f",
  },
  date: {
    fontSize: responsiveFontSize(2.5),
    padding: 5,
    bottom: responsiveHeight(3),
  },
  boxContainer1: {
    flex: 1,
    display: "flex",
    marginTop: responsiveHeight(10),
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
    marginRight: responsiveWidth(3),
    borderRadius: 5,
    marginTop: responsiveHeight(1.5),
    borderColor: "#009b9f",
  },
  boxact: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(6),
    flexBasis: responsiveWidth(28),
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: responsiveHeight(1.5),
    marginRight: responsiveWidth(3),
    borderRadius: 5,
    backgroundColor: "#009b9f",
    borderColor: "#009b9f",
    borderWidth: 0,
  },
  btnbox: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  btn: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(58),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    bottom: responsiveHeight(4),
    left: responsiveWidth(5),
  },
  btndis: {
    width: responsiveWidth(90),
    marginTop: responsiveHeight(58),
    backgroundColor: "#009b9f",
    color: "white",
    padding: responsiveWidth(4),
    textAlign: "center",
    borderRadius: 5,
    opacity: 0.5,
    bottom: responsiveHeight(4),
    left: responsiveWidth(5),
  },
});
