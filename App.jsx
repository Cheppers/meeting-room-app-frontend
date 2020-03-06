/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppNavigator from './navigator';
import store from './store';
import * as NavigationService from './services/navigationService';
import logos from './consts/Logos';

const persistor = persistStore(store);

class App extends React.Component {
  navigator = null;

  componentDidMount() {
    // eslint-disable-next-line
    const fetchableImages = Object.values(logos).map((logo) => ({ uri: isNaN(logo) ? logo : Image.resolveAssetSource(logo).uri }));
    FastImage.preload(fetchableImages);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator ref={(ref) => {
            if (!this.navigator) {
              this.navigator = ref;
              NavigationService.setNavigator(this.navigator);
            }
          }}
          />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
