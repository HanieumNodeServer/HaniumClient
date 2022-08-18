import {
    Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import TicketingInfo from "./ticketing";

/*
const content = async function(){
    const result = await fetch('http://43.200.99.243/bus/list',{method: 'GET'})
        .then((response)=> response.json())
        .then((json) => setData(json));
}*/

const navOptions = () => {

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        padding: 10,
        backgroundColor: '#EBEBEB',
      }}>
      <View style={[{marginHorizontal: 15, marginTop: 50}]}>
        <Text style={styles.text}>불러, 부릉~</Text>
      </View>

      <View
        style={{
          // height: "90%",
          flex: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>

          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 5,
              backgroundColor: '#D1E7F3',
              margin: 5,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={require("../assets/MAIN_MIC.png")}
            />
          </View>
        </TouchableOpacity>
        <Text style={{marginVertical: 10, fontSize: 15}}>
          버튼을 눌러 음성 예매를 시작하세요!
        </Text>
      </View >
      <TouchableOpacity onPress={() => navigation.navigate('TicketingScreen')}>
          <TicketingInfo />
      </TouchableOpacity>
    </View>
  );
};

export default navOptions;

const styles = StyleSheet.create({
  text: {
    color: '#1B4679',
    fontSize: 30,
  },
    contents : {
        fontSize: 15,
        marginLeft : 20
    }
});
