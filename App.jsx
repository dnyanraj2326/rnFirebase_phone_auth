import { StyleSheet, Text, TouchableOpacity, View,TextInput, SafeAreaView, StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import {Colors} from './src/constant/Theme';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.white} />
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
      <Toast/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.white
  }
})