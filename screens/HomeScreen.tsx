import {Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import NavOptions from '../components/navOptions';

function HomeScreen() {
  // const enterChat = (userName) => {
  //   navigation.navigate("Chat", {
  //     userName,
  //   })
  // }

  const url =
    'http://43.200.99.243/user/ticket/reservation/info?' + 'userId=' + '1';

  // useEffect(() => {
  //   fetch(url, {method: 'GET'})
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log([
  //         json.result.result[0].DepartTerminal,
  //         json.result.result[0].ArrivalTerminal,
  //       ]);
  //     })
  //     .catch(error => console.log(error))
  //     .finally();

  //   return () => {
  //     console.log('앙');
  //   };
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <NavOptions />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
