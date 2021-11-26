import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FilmVues from '../Components/FilmVues';
import FilmDetail from '../Components/FilmDetail';

const Stack = createStackNavigator();

const FilmVueStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="FilmVue" component={FilmVues} options={{ title: "Mes Films Vues", 
            headerStyle: { backgroundColor: '#0171b7' },
            headerTitleStyle: { color: '#fff', textAlign: "center" } 
        }}/>
        <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ 
            title: "Details", headerShown: false 
        }} />
    </Stack.Navigator>
);

export default () => (
    <FilmVueStackNavigator/>
);