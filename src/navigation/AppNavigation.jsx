import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
const AppNavigation = () => {
    const Stack = createNativeStackNavigator();
  return (
   <Stack.Navigator
   screenOptions={{
    headerShown:false
   }}
   >
    <Stack.Screen name='login' component={LoginScreen} />
    <Stack.Screen name='home' component={HomeScreen} />
   </Stack.Navigator>
  )
}

export default AppNavigation