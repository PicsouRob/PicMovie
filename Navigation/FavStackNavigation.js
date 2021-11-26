import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavFilm from '../Components/FavFilm';
import FilmDetail from '../Components/FilmDetail';

const Stack = createStackNavigator();

const FavStackNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen name="FavFilms" component={FavFilm} options={{ title: "Mes Films Favoris", 
            headerStyle: { backgroundColor: '#0171b7' },
            headerTitleStyle: { color: '#fff', textAlign: "center" } 
        }}/>
        <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ 
            title: "Detail", headerShown: false
        }}/>
    </Stack.Navigator>
);

export default () => (
    <FavStackNavigation/>
);
