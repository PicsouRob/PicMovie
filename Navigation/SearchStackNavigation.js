import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";

const Stack = createStackNavigator();

const SearchStackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={Search} options={{ 
      title: "Recherche Film", headerStyle: { backgroundColor: '#0171b7' },
      headerTitleStyle: { color: '#fff', textAlign: "center"}
    }}/>
    <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ 
      title: "Details", headerShown: false 
    }}/>
  </Stack.Navigator>
);

export default () => (
  <SearchStackNavigation/>
);