import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';

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
  const [date, setDate] = useState('');
  const [rest, setRest] = useState('');
  const [weekday, setWeekday] = useState(0);

  const week = ['일', '월', '화', '수', '목', '금', '토'];
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
        const start3 = `${start2.format('HH:mm')}`;
        console.log(start3);

        const end3 = `${end2.format('HH:mm')}`;
        console.log(end3); // console.log([json.result.result[0].DepartTerminal,json.result.result[0].ArrivalTerminal])
        setDepartData(json.result.result[0].DepartTerminal);
        setArrivalData(json.result.result[0].ArrivalTerminal);
        setCharge(json.result.result[0].charge);
        setCorName(json.result.result[0].corName);
        setSeat(json.result.result[0].seat);
        setMonth(start.getMonth() + 1);
        setDay(start.getDate());
        setStartTime(start3);
        setArrivalTime(end3);

        setDate(moment(json.result.result[0].startTime).format('MM/DD'));
        setRest(
          moment(json.result.result[0].startTime).startOf('day').fromNow(),
        );
        setWeekday(moment(json.result.result[0].startTime).weekday());

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
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text> </Text>
        <Text> </Text>
        <Text
          style={{
            fontSize: 18,
            margin: 5,
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          }}>
          시외버스 승차권
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            padding: 5,
          }}>
          <View>
            <Text
              style={{color: 'white', fontWeight: 'bold'}}>{`예매 취소`}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          height: 'auto',
          padding: 10,
          paddingHorizontal: 18,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Image
            style={{
              width: 110,
              height: 100,
              resizeMode: 'cover',
              overflow: 'hidden',
            }}
            source={require('../assets/bus.png')}
          />
          <Text style={styles.contents}>{corName}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000000',
            }}>
            {`${date}(${week[weekday]})`}
          </Text>
          <Text
            style={{
              fontSize: 23,
              color: 'black',
              marginLeft: 10,
            }}>{`${rest}`}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 25, marginTop: 10, color: 'black'}}>
            {startTime}
          </Text>
          <Text
            style={{fontSize: 17, marginTop: 10}}>{` ~ ${arrivalTime}`}</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#D1E7F3',
            marginTop: 15,
            padding: 5,
            width: 130,
            borderRadius: 7,
          }}>
          <View>
            <Text style={{color: 'black'}}>{`좌석: `}</Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderStyle: 'dotted',
            marginVertical: 15,
          }}
        />

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <QRCode
            size={100} // 로고 사이즈 조절
            value="https://www.naver.com" // 실제 연결 될 주소
            logoSize={300}
            logoBackgroundColor="transparent"
          />
          <Text style={{marginTop: 15, color: 'black'}}>
            승차 시 리더기에 찍어주세요.
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
