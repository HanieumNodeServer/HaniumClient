import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
        }}>
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
              source={{
                uri: 'https://user-images.githubusercontent.com/79521972/182748280-83cb4879-76e5-48d0-bb5c-f5420a34bc62.png',
              }}
            />
          </View>
        </TouchableOpacity>
        <Text style={{marginVertical: 10, fontSize: 15}}>
          버튼을 눌러 음성 예매를 시작하세요!
        </Text>
      </View>
      <TouchableOpacity
        style={{
          // width: "90%",
          height: 120,
          marginTop: 20,
          backgroundColor: '#D1E7F3',
          borderRadius: 20,
          padding: 10,
        }}>
        <View>
          <Text style={{fontSize: 15, margin: 10}}>예매 현황</Text>
        </View>
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
});
