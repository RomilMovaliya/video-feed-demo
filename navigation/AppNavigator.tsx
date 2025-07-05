import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;