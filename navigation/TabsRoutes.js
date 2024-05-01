// navigations
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// icons
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//screens
import HomeScreens from "./screens/HomeScreens";
import RateList from "./screens/RateList";
import Pickup from "./screens/Pickup";
import NavigationString from "./NavigationString";

const Tab = createMaterialTopTabNavigator();

export default function TabsRoutes() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName={NavigationString.HOME}
      keyboardDismissMode='auto'
      screenOptions={{
        tabBarActiveTintColor: "#009b9f",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { 
          fontSize: 8 
        },
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#fff",
        },
        tabBarIndicatorStyle:{
          backgroundColor:'#009b9f',
        },
      }}

    >
      <Tab.Screen
        name={'MainHomes'}
        component={HomeScreens}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Feather
                  name="home"
                  style={{ color: focused ? "#009b9f" : "black", fontSize: 23 }}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name={NavigationString.RATELIST}
        component={RateList}
        options={{
          tabBarLabel: "Ratelist",
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <FontAwesome
                  name="rupee"
                  style={{ color: focused ? "#009b9f" : "black", fontSize: 23,paddingHorizontal:6}}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name={NavigationString.PICKUP}
        component={Pickup}
        options={{
          tabBarLabel: "Pickup",
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Feather
                  name="truck"
                  style={{
                    color: focused ? "#009b9f" : "black",
                    fontSize: 23,
                }}
                />
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
