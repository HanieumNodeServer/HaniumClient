import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

const FirstScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flexDirection: 'column', flex: 1, margin: 20}}>
      <View style={{flex: 1}}>
        <Text style={{color: 'gray', fontSize: 30}}>WELCOME!</Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          '불러, 부릉' 앱에 오신 것을
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          환영합니다!
        </Text>
      </View>

      <View style={{backgroundColor: 'white', flex: 2}}></View>

      <View style={{flexDirection: 'column', flex: 1, marginTop: 50}}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <View
            style={{
              backgroundColor: '#1e90ff',
              padding: 15,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              비회원으로 시작하기
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#ffffff',
            marginTop: 10,
            padding: 15,
            borderColor: '#1e90ff',
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Text style={{color: '#1e90ff', textAlign: 'center'}}>
            신분증 진위 여부
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FirstScreen;
