import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import LoginPage from '../authPage/Login'

export const AppNavigator = createStackNavigator({
        LoginPage: {
            screen: LoginPage,
            navigationOptions: { header: null }
        }
    },{
        initialRouteName: 'LoginPage',
        defaultNavigationOptions: {
          headerBackTitle: () => null,
          headerBackImage: () => null
    }
})
