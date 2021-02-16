import { createStackNavigator } from 'react-navigation-stack'
import LoginPage from '../authPage/Login';
import SignUp from '../authPage/SignUp';
import HomePage from '../chatPage/HomePage'

export const AppNavigator = createStackNavigator({
        LoginPage: {
            screen: LoginPage,
            navigationOptions: { header: null }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: { header: null }
        },
        HomePage: {
            screen: HomePage,
            navigationOptions: { header: null }
        }
    },{
        initialRouteName: 'LoginPage',
        defaultNavigationOptions: {
          headerBackTitle: () => null,
          headerBackImage: () => null
    }
})
