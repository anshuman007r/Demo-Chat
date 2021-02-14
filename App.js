import React, { Component } from 'react'
import { View } from 'react-native'
import { createAppContainer, NavigationActions } from 'react-navigation';
import { AppNavigator } from '../demochat/component/NavigationPage/Navigation'

export default class App extends Component {
  render() {
    return (
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
    )
  }
}

const AppContainer = createAppContainer(AppNavigator)