import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import SearchMovies from './SearchStackNavigation';
import MoviesFav from './FavStackNavigation';
import DiscoverStack from './DiscoverFilmStackNavigation';
import FilmVueStack from './FilmVueStackNavigation';

const Tab = createBottomTabNavigator();

const MovieTabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Search"
        backBehavior='history'
        tabBarOptions={{
            inactiveTintColor:"rgba(0, 0, 0, 0.7)",
            activeTintColor:"#0171b7",
            labelStyle: { fontWeight: "bold", marginBottom: 8 },
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
    >
        <Tab.Screen name="Search" component={SearchMovies} 
            options={{ title: "Recherche" }}/>
        <Tab.Screen name="Favorites" component={MoviesFav}
            options={{ title: "Favoris" }}/>
        <Tab.Screen name="Discover" component={DiscoverStack} 
            options={{ title: "Discover" }}/>
        <Tab.Screen name="Vue" component={FilmVueStack} 
            options={{ title: "Vues" }}/>
    </Tab.Navigator>
)

function screenOptions(route, color) {
    var iconName;
    switch (route.name) {
        case "Search":
            iconName="search-sharp";
            break;
        case "Favorites":
            iconName="heart-circle";
            break;
        case "Discover":
            iconName="compass-sharp";
            break;
        // case "Video":
        //     iconName="compass-sharp";
        //     break;
        case "Vue":
            iconName="logo-vue";
            break;
        default:
            break;
    }
    return (
        <Icon type="ionicon" name={iconName} size={20} color={color}/>
    )
}

export default () => (
    <NavigationContainer>
        <MovieTabNavigator/>
    </NavigationContainer>
)
