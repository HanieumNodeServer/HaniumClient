import {View, Text, SafeAreaView, Image, StyleSheet, Button, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {flex} from "twrnc/dist/esm/resolve/flex";

const SuccessLogin = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#EBEBEB',
        }}>

            <View style={styles.header}>

            </View>

            <View style={styles.contents}>

                <Text style={styles.text}>
                    회원 가입에 성공했습니다!
                </Text>

                <Text style={styles.text}>
                    아래 버튼을 클릭하셔서 서비스 화면으로 이동해주세요
                </Text>


            </View>
            <View style={styles.footer}>

                <View style={{
                    flexDirection : "row",
                    width : "100%",
                    height : "100%"
                }}>

                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}

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
                            서비스 이용하기
                        </Text>
                    </TouchableOpacity>

                </View>



            </View>

        </SafeAreaView>

    );
};

export default SuccessLogin;

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        fontSize: 18,
        marginTop : 30,
        textAlign : "center"
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
        height:'10%',
        // backgroundColor: '#ff9a9a',
        // borderWidth : 2,
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
