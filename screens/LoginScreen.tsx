import {View, Text, SafeAreaView, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {flex} from "twrnc/dist/esm/resolve/flex";


const LoginScreen = () => {

    const navigation = useNavigation();

  return (
      <SafeAreaView style={{
          flex: 1,
          padding: 10,
          backgroundColor: '#EBEBEB',
      }}>

          <View style={styles.contents}>
        {/*      <View style={{
                  flex : 1
              }}>*/}
                  <Image
                      style={{
                          width : '90%',
                          height : "30%",
                          // backgroundColor : 'orange',
                          resizeMode : 'contain',
                          margin : 40
                      }}
                      source={require("../assets/loginImage.png")}
                  />
              {/*</View>*/}

              <Text style={styles.text}>
                  신분증을 촬영해주세요
              </Text>
              <Text style={styles.text}>
                  해당 정보는 로그인 정보로 대체됩니다.
              </Text>
          </View>
          <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginOCR')}

                  style={{
                    width : "100%",
                    height : "100%",
                    backgroundColor: '#D1E7F3',
                    padding: 20,
                    borderRadius: 30,
                }} >
                    <Text style={{
                        color: '#000000',
                        fontSize: 15,
                        textAlign: 'center',
                    }}>
                        신분증 촬영 시작하기
                    </Text>
                </TouchableOpacity>
          </View>

      </SafeAreaView>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        fontSize: 18,
        marginTop : 10,
        // fontWeight: "bold"

    },
    contents : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:30,
        // backgroundColor: '#d6ca1a',
    },
    header : {
        width:'100%',
        height:'5%',
        // backgroundColor: '#ff9a9a',
        borderWidth : 2,
        alignItems : "center",
    },
    footer : {
        width:'100%',
        height:'10%',
        // backgroundColor : 'blue',
        padding : 5,
        alignItems : "center",
    }
});
