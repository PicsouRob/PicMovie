import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopRated from '../Components/TopRated';
import NewMovies from '../Components/NewMovies';
import Popular from '../Components/Popular';

const Tab = createMaterialTopTabNavigator();

function DiscoverTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="New"
            lazy="true"
            tabBarOptions={{
                activeTintColor: "#fff",
                labelStyle: { fontWeight: "bold" },
                pressColor: "#fff",
                indicatorStyle: { backgroundColor: "#fff" },
                style: {
                    backgroundColor: "#0171b7"
                }
            }}
        >
        <Tab.Screen name="New" component={NewMovies} options={{ tabBarLabel: "Nouveau" }} />
            <Tab.Screen name="TopRated" component={TopRated} options={{ title: "Top Rated" }} />
            <Tab.Screen name="Popular" component={Popular} options={{ title: "Populaire" }} />
        </Tab.Navigator>
    )
};

export default () => (
    <DiscoverTabNavigator/>
);