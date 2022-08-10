import {
  Image, StyleSheet, Text, View, SafeAreaView,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/navOptions';

function HomeScreen() {
  // const enterChat = (userName) => {
  //   navigation.navigate("Chat", {
  //     userName,
  //   })
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <NavOptions />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
