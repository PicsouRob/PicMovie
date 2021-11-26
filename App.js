import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/lib/integration/react";
// import { I } from 'react-native'

import Store from './Store/ConfigStore';
import Movies from './Navigation/TabNavigation';

class App extends React.Component {
  render() {
    let persistor = persistStore(Store);
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Movies/>
        </PersistGate>
      </Provider>
    )
  } 
};

export default App;