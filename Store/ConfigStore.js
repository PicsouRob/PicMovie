import { createStore } from "redux";
import { persistCombineReducers } from 'redux-persist';

import AsyncStorage from '@react-native-community/async-storage';

import FavToggle from "./Reducers/FavReducers";
import VueReducers from "./Reducers/VueReducers";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const Store = createStore(persistCombineReducers(rootPersistConfig, { FavToggle, VueReducers }));

export default Store;