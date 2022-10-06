import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import App from "../App";
import {ActivityIndicator, Button, Image, Linking, SafeAreaView, Text, TouchableOpacity, View,PermissionsAndroid} from "react-native";
import * as RNFS from 'react-native-fs';
import moment from "moment";
import Toast from './SuccessLogin';
import { Svg,Defs,Rect,Mask} from "react-native-svg";


const imagePath = `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera/${moment().format('YYYYMMDD')}.jpg`.replace(/:/g, '-');



async function takePhoto(camera) {


    try {
        // console.log(camera)
        //Error Handle better
        if (camera.current == null) {
            throw new Error('Camera Ref is Null');
        }
        console.log('Photo taking ....');
        const photo = await camera.current.takePhoto({
            flash: "off"
        });

        console.log(photo.path);
        RNFS.copyFile(photo.path, imagePath)
            .then(res => {
                console.log("옮겨짐?")
                console.log(imagePath)
            })
            .catch(err => {
                console.log('ERROR: image file write failed!!!');
                console.log(err.message, err.code);
            });

        return photo.path;

    } catch (error) {
        console.log(error);
    }
}

function image(uri){

    console.log(uri)

    return (
        <View style={{
            flex:1
        }}>
            <Text>HI!</Text>
            <Image source={{uri : uri}}
            style={{
                flex:1
            }}
            />
        </View>
    )

}

function CameraFrame(){

    return (
        <Svg
            height = "100%"
            width = "100%">
            <Defs>
                <Mask
                    id = "mask"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%">
                    <Rect
                        height = "100%"
                        width="100%"
                        fill="#fff"/>

                    <Rect
                        x="13%"
                        y="6%"
                        height="450"
                        width="300"
                        fill="black"/>
                </Mask>
            </Defs>

            <Rect
                height="70%"
                width="100%"
                fill="rgba(0,0,0,0.5)"
                mask="url(#mask)"
            />
        </Svg>
    )
}

function renderCamera(camera,navigation) {

    const devices = useCameraDevices();
    const device = devices.back;
    // const camera = useRef<Camera>(null)
    // console.log(device)

    React.useEffect( () => {
        requestCameraPermission();
        // requestStoragePermission();

    },[])


    const requestCameraPermission = React.useCallback(async () => {
        const permission = await Camera.requestCameraPermission();
        const grantedStorage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "저장 공간 권한 요청",
                message: "저장공간에 사진 이미지를 담기에 동의합니다.",
                buttonNeutral: "나중에 다시 하기",
                buttonNegative: "거부",
                buttonPositive: "승인"
            })

        if(permission === 'denied') {
            console.log("?")
            await Linking.openSettings();
        }
    },[])




    if(device === null){
        console.log("????????????")
        return <ActivityIndicator size={20} color={'red'} />;
    }else if(device){
        // console.log(device)
        return (

            <View style={{
                flex : 1,
                /*alignItems: "center",
                justifyContent : "center"*/
            }}>

                <Camera style={{
                    width: "100%",
                    height : "70%"
                }}
                        ref={camera}
                        device={device}
                        isActive={true}
                        enableZoomGesture
                        photo={true}

                />

                <View
                    style={{
                        position : "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    }}>
                    <CameraFrame/>

                </View>

                <Text style={{
                    fontSize : 20,
                    textAlign: "center",
                    color: "black",
                    marginTop : 20
                }}
                >
                    사각형에 맞춰서 신분증을 촬영해주세요</Text>


                <View style={{
                    alignItems : 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#EB5826",
                            width : 60,
                            height : 60,
                            borderWidth : 2,
                            borderColor: "black",
                            borderRadius : 30,
                            marginTop : 50

                        }}// TODO : 사진찍자~~
                        onPress={ () => {
                            takePhoto(camera).then((result)=>{

                                console.log("헤이! 결과물이야")
                                console.log(result)

                                if(result){
                                    setTimeout(()=>{
                                        navigation.navigate('LoginCheck');
                                    },1000)
                                }
                                // image(result)
                            })
                        } }/>
                </View>


            </View>

        )

    }

}


const OCR = () =>{

    const camera = useRef<Camera>(null);
    const navigation = useNavigation();



    return (
        <View style={{
            flex : 1,
            flexDirection : 'column'
        }}>
            {renderCamera(camera,navigation)}

        </View>

    );

}


export default OCR
