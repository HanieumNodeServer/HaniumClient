import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView,Text,View,Image,StyleSheet} from "react-native";
import moment from 'moment';


function TicketingScreen({navigation}) {
    const [departData, setDepartData] = useState(undefined);
    const [arrivalData, setArrivalData] = useState(undefined);
    const [charge, setCharge] = useState(undefined);
    const [corName, setCorName] = useState(undefined);
    const [seat, setSeat] = useState(undefined);
    const [startTime, setStartTime] = useState(undefined);
    const [arrivalTime, setArrivalTime] = useState(undefined);
    const [exist, isExist] = useState<boolean>(false);

    const date = moment().format("M월DD일");


    const url = 'http://43.200.99.243/user/ticket/reservation/info?' +
        'userId=' +
        '1' // 바꾸기

    useEffect(()=>{
        fetch(url,{method:"GET"})
            .then((response)=>response.json())
            .then((json)=>{

                let start = [json.result.result[0].startTime
                    .slice(0, 2), "시", json.result.result[0].startTime
                    .slice(2),"분"].join('');

                let end = [json.result.result[0].arrivalTime
                    .slice(0, 2), "시", json.result.result[0].arrivalTime
                    .slice(2),"분"].join('');

                // console.log([json.result.result[0].DepartTerminal,json.result.result[0].ArrivalTerminal])
                setDepartData(json.result.result[0].DepartTerminal);
                setArrivalData(json.result.result[0].ArrivalTerminal);
                setCharge(json.result.result[0].charge);
                setCorName(json.result.result[0].corName);
                setSeat(json.result.result[0].seat);
                setStartTime(start);
                setArrivalTime(end);

                if(departData){
                    isExist(true);
                }else{
                    isExist(false)
                }
            })
            .catch((error) => console.log(error));
    }, [exist])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '예매 현황',
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'black',
            headerTitleAlign: 'center',
        });
    }, []);

    return (
        <SafeAreaView style={{
            height: "90%",
            margin: 20,
            backgroundColor: '#D1E7F3',
            borderRadius: 20,
            padding: 10,
        }}>
            <Text style={{fontSize: 15, margin: 5}}>예매 현황</Text>

            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 20,
            }} >
                <View style={{
                    alignItems : "center",
                }}>
                    <Image
                        style={{
                            width : 110,
                            height : 100,
                            resizeMode: "cover",
                            overflow : "hidden"
                        }}
                        source={{
                            uri : 'https://user-images.githubusercontent.com/66247589/184088529-93da1059-0982-4222-8617-3f994035877e.PNG'
                        }}
                    />
                    <Text style={styles.contents}>{corName}</Text>
                </View>

                <View style={{
                    height: 'auto',
                    alignItems : "flex-start",
                }}>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 10,
                        color : "#000000",
                    }}>
                        {date}
                    </Text>
                </View>
                <View style={{
                    height: 'auto',
                    alignItems : "flex-start",
                }}>
                    <Text style={{fontSize: 20,marginLeft: 10}}>{startTime} ~ {arrivalTime}</Text>
                </View>
            </View>


        </SafeAreaView>
    )

}

export default TicketingScreen;

const styles = StyleSheet.create({
    text: {
        color: '#1B4679',
        fontSize: 30,
    },
    contents : {
        fontSize: 15,
        color: '#1B4679',
        alignItems : "center",
    }
});
