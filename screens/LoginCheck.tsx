import {View, Text, SafeAreaView, Image, StyleSheet, Button, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {flex} from "twrnc/dist/esm/resolve/flex";

const LoginCheck = () => {

    const navigation = useNavigation();

    const [userName,setUserName] = useState('');
    const [frontIdNumber,setFrontIdNumber] = useState('');
    const [backIdNumber,setBackIdNumber] = useState('');
    const [exist,setExist] = useState(null);

    useEffect( () => {
        setExist(true);
        setUserName("조준기");
        setFrontIdNumber("981208");
        setBackIdNumber("1070724");
    },[exist]);




    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#EBEBEB',
        }}>

            <View style={styles.header}>
                <Text style={{
                    fontSize: 30,
                    fontWeight : "bold",
                    color : "black",
                    // justifyContent : 'center'
                    marginTop : 15
                }}>
                    신분증 정보 확인
                </Text>
            </View>

            <View style={styles.contents}>
                {/*      <View style={{
                  flex : 1
              }}>*/}
                {/*</View>*/}

                <View style={{
                    width: "100%",
                    height : "20%",
                    // borderWidth : 2,
                    marginTop : 80,
                    padding : 2,
                    flexDirection : "row"
                }}>
                    <View style={{
                        width:"38%",
                        height: "100%",
                        // borderWidth : 2,
                        flexDirection : "column"
                    }}>
                        <View style={{
                            flex: 1,
                            // borderWidth : 1,
                            padding : 1,
                            alignItems: "center",
                            justifyContent : "center"
                        }}>
                            <Text style={{
                                fontSize : 20,
                                color : "black"
                            }}>
                                이름 :
                            </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            // borderWidth : 1,
                            padding : 1,
                            alignItems: "center",
                            justifyContent : "center"
                        }}>
                            <Text style={{
                                fontSize : 20,
                                color : "black"
                            }}>
                                주민등록번호 :
                            </Text>
                        </View>

                    </View>

                    <View style={{
                        width:"62%",
                        height: "100%",
                        // borderWidth : 2,
                    }}>

                        <View style={{
                            flex: 1,
                            // borderWidth : 1,
                            padding : 1,
                            alignItems: "center",
                            justifyContent : "center"
                        }}>
                            <TextInput
                                style={{
                                    width: "100%",
                                    height : "100%",
                                    borderWidth : 2,
                                    fontSize : 20,
                                    borderRadius : 10,
                                    alignItems: "center",
                                    justifyContent : "center",
                                    textAlign : "center"
                                }}
                                value={userName}
                                onChangeText={(text) => setUserName(text)}>

                            </TextInput>

                        </View>

                        <View style={{
                            flex: 1,
                            // borderWidth : 1,
                            padding : 1,
                            alignItems: "center",
                            justifyContent : "center",
                            flexDirection : "row"
                        }}>

                            <TextInput
                                style={{
                                    width: "45%",
                                    height : "100%",
                                    borderWidth : 2,
                                    fontSize : 20,
                                    borderRadius : 10,
                                    textAlign : "center"
                                }}
                                value={frontIdNumber}
                                onChangeText={(text) => setFrontIdNumber(text)}>

                            </TextInput>
                            <Text
                                style={{
                                    fontSize : 25
                                }}> - </Text>

                            <TextInput
                                style={{
                                    width: "45%",
                                    height : "100%",
                                    borderWidth : 2,
                                    fontSize : 20,
                                    borderRadius : 10,
                                    textAlign : "center"
                                }}
                                value={backIdNumber}
                                onChangeText={(text) => setFrontIdNumber(text)}>

                            </TextInput>

                        </View>

                    </View>


                </View>


                    <Text style={[styles.text,{
                    marginTop : 60}
                    ]}>
                        회원님의 정보가 맞으신지 확인해주세요.
                    </Text>

                <Text style={styles.text}>
                    만약 아니라면 입력창을 클릭하셔서 수정해주세요
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
                                          width : "49%",
                                          height : "100%",
                                          backgroundColor: '#CCCCCC',
                                          padding: 20,
                                          borderRadius: 30,
                                          marginRight : 10
                                      }} >
                        <Text style={{
                            color: '#000000',
                            fontSize: 15,
                            textAlign: 'center',
                        }}>
                            비회원으로 시작하기
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SuccessLogin')}

                                      style={{
                                          width : "49%",
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
                            회원 정보 제출하기
                        </Text>
                    </TouchableOpacity>

                </View>



            </View>

        </SafeAreaView>

    );
};

export default LoginCheck;

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        fontSize: 18,
        marginTop : 30,
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
