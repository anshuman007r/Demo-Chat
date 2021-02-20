import React, { Component } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import { createAppContainer, NavigationActions } from 'react-navigation';
import { AppNavigator } from '../demochat/component/NavigationPage/Navigation'
import { store } from './storage/store'
import { Provider } from 'react-redux'
 
export default class App extends Component {
 componentDidMount(){
    this.requestCameraPermission()
 }

 requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('permission granted')
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

  render() {
    return (
        <Provider store={store}>
          <AppContainer 
            ref={nav => { this.navigator = nav; }}
            onNavigationStateChange={(prevState, currentState, action) => {
              // const currentScreen = APP_UTIL.getActiveRouteName(currentState);
              // const prevScreen = APP_UTIL.getActiveRouteName(prevState);
              // console.log("State test", prevScreen, currentScreen)
              // if (prevScreen !== currentScreen) {
              //   const screen = currentScreen
              //   console.log('Current Screen', screen)
              //   store.dispatch(setScreen(screen))
              // }
            }}
          />
        </Provider>

    )
  }
}

const AppContainer = createAppContainer(AppNavigator)