import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
    SplashScreen: undefined;
    HomeScreen: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('HomeScreen');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);
    return (
        <View>
            <Text>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})