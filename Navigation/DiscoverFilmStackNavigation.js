import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import FilmDetail from '../Components/FilmDetail';
import Discover from './DiscoverTopTabNavigation';

const Stack = createStackNavigator();

const DiscoverFilmStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Discover" component={Discover} options={{ title: "Discover", 
                headerStyle: { backgroundColor: '#0171b7' },
                headerTitleStyle: { color: '#fff', textAlign: "center" } 
            }}/>
            <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ 
                title: "Details", headerShown: false 
            }} />
        </Stack.Navigator>
    )
}

export default () => (
    <DiscoverFilmStackNavigator/>
);