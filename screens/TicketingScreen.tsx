import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, Text, View, Image, StyleSheet} from 'react-native';
import moment from 'moment';

function TicketingScreen({navigation}) {

  const [departData, setDepartData] = useState(undefined);
  const [arrivalData, setArrivalData] = useState(undefined);
  const [charge, setCharge] = useState(undefined);
  const [corName, setCorName] = useState(undefined);
  const [seat, setSeat] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [arrivalTime, setArrivalTime] = useState(undefined);
  const [exist, isExist] = useState<boolean>(false);

  const date = moment().format('M월DD일');

  const url =
    'http://43.200.99.243/user/ticket/reservation/info?' + 'userId=' + '1'; // 바꾸기

  useEffect(() => {
    fetch(url, {method: 'GET'})
      .then(response => response.json())
      .then(json => {
          let start = new Date(json.result.result[0].startTime);
          let end = new Date(json.result.result[0].arrivalTime);

          let start2 = moment(json.result.result[0].startTime);
          let end2 = moment(json.result.result[0].arrivalTime);
          // end2 = end2
          const start3 = `${start2.format('HH')}시 ${start2.format('mm')}분`;
          console.log(start3);

          const end3 = `${end2.format('HH')}시 ${end2.format('mm')}분`;
          console.log(end3);        // console.log([json.result.result[0].DepartTerminal,json.result.result[0].ArrivalTerminal])
          setDepartData(json.result.result[0].DepartTerminal);
          setArrivalData(json.result.result[0].ArrivalTerminal);
          setCharge(json.result.result[0].charge);
          setCorName(json.result.result[0].corName);
          setSeat(json.result.result[0].seat);
          setMonth((start.getMonth()+1));
          setDay(start.getDate());
          setStartTime(start3);
          setArrivalTime(end3);

        if (departData) {
          isExist(true);
        } else {
          isExist(false);
        }
      })
      .catch(error => console.log(error));
  }, [exist]);

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
    <SafeAreaView
      style={{
        height: '90%',
        margin: 20,
        backgroundColor: '#D1E7F3',
        borderRadius: 20,
        padding: 10,
      }}>
      <Text style={{fontSize: 15, margin: 5}}>예매 현황</Text>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 110,
              height: 100,
              resizeMode: 'cover',
              overflow: 'hidden',
            }}
            source={require("../assets/bus.png")}
          />
          <Text style={styles.contents}>{corName}</Text>
        </View>

        <View
          style={{
            height: 'auto',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              color: '#000000',
            }}>
            {date}
          </Text>
        </View>
        <View
          style={{
            height: 'auto',
            alignItems: 'flex-start',
          }}>
          <Text style={{fontSize: 17, marginLeft: 10}}>
            {startTime} ~ {arrivalTime}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );

}

export default TicketingScreen;

const styles = StyleSheet.create({
  text: {
    color: '#1B4679',
    fontSize: 30,
  },
  contents: {
    fontSize: 15,
    color: '#1B4679',
    alignItems: 'center',
  },
});
