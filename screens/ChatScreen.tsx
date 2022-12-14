import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState, useCallback, useEffect} from 'react';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import {Button} from '@rneui/themed';
import {Avatar, Input} from '@rneui/base';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
// import { GiftedChat, IMessage } from "react-native-gifted-chat";
// import {db, auth} from 'firebase'
import uuid from 'react-native-uuid';
import {useRecordingCheck} from '../utils/hooks';
import {
  GiftedChat,
  Composer,
  InputToolbar,
  Bubble,
  Time,
  Actions,
  ActionsProps,
} from 'react-native-gifted-chat';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/ko';
import {useSelector} from 'react-redux';
import {selectObject, setObject} from '../slices/navSlice';
import {selectTicketInfo, setTicketInfo} from '../slices/ticketSlice';
import {useDispatch} from 'react-redux';

interface ILocation {
  latitude: number;
  longitude: number;
}

const USER = {
  _id: 1,
  name: 'Me',
};
const BOT = {
  _id: 2,
  name: 'Bot',
  avatar:
    'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/04/urbanbrush-20190415104502071218.png',
};

const firstMessage = `π€μλνμΈμ μμΈλ²μ€ μλ§€ μ±λ΄ AI\n'λΆλ¦μ΄' μλλ€!\n\n\
μλλ³΄μ΄μλ λ§μ΄ν¬ λ²νΌμ λλ¬ μλ§€λ₯Ό μμν΄ μ£ΌμΈμ!\n\nβ­μ¬μ© μμβ­\nβλ΄μΌ μ€ν 3μμ μμΈμμ λΆμ°μΌλ‘ κ°λ\nβμ΄λ²μ£Ό κΈμμΌ μΈμ² μ²μ\nβλ΄μΌ λκ΅¬\n\n\
βμ£Όμ μ¬ν­β\nκ°κ³ μ νλ κ³³κ³Ό μΆλ°νμλ κ³³μ 'μ§μ­λͺ νΉμ ν°λ―Έλμ΄λ¦'μ λ§ν΄μ£ΌμμΌ λ μνν μλΉμ€κ° μ κ³΅λ©λλ€.`;

interface messageType {
  id: number;
  text: string;
  createdAt: string;
}

function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  // const [speech, setSpeech] = useState('');

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  const [career, setCareer] = useState({
    terSfr: '',
    terSto: '',
    date: '',
    time: '',
    arrTime: '',
  });

  const [body, setBody] = useState({
    routeId: '',
    departureTer: '',
    arrivalTer: '',
    date: '',
    time: '',
    startTime: '',
    arrivalTime: '',
    corName: '',
    charge: '',
    seat: '',
    rotId: '',
    duration: '',
  });

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: firstMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'λΆλ¦μ΄',
          avatar: require('../assets/robot.png'),
        },
      },
    ]);
    // console.log('destroy');
    // console.log(ticketInfo);
    setCareer({
      terSfr: '',
      terSto: '',
      date: '',
      time: '',
      arrTime: '',
    });
    // dispatch(
    //   setObject({
    //     terSfr: '',
    //     terSto: '',
    //     date: '',
    //     time: '',
    //     arrTime: '',
    //   }),
    // );
  }, []);

  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [isProgress, setIsProgress] = useState(false);
  const [maxSeat, setMaxSeat] = useState(0);
  const [seatInfo, setSeatInfo] = useState<string[] | number[]>([]);

  // const objectList = useSelector(selectObject);
  const ticketInfo = useSelector(selectTicketInfo);
  const dispatch = useDispatch();
  // console.log('objectList');
  // console.log(objectList);

  // console.log('μ£ΌκΈ°μ μΈ caeer');
  // console.log(career);
  // console.log('μ£ΌκΈ°μ μΈ body');
  // console.log(body);
  // console.log('μ£ΌκΈ°μ μΈ seat');
  // console.log(maxSeat);

  useEffect(() => {
    console.log('μ΄κ±°λ...?');
    console.log(career);
  }, [career]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('position:' + latitude, longitude);
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log('μλ¬');
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  // let body = {
  //   routeId: '',
  //   departureTer: '',
  //   arrivalTer: '',
  //   date: '',
  //   time: '',
  //   startTime: '',
  //   arrivalTime: '',
  //   corName: '',
  //   charge: '',
  //   seat: '',
  //   rotId: '',
  //   duration: '',
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'μλ§€ AI(λΆλ¦μ΄)',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerTitleAlign: 'center',
    });
  }, []);

  // κ±΄λ€λ©΄ X
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // console.log(isProgress);

  const onSpeechStart = (e: any) => {
    setIsProgress(true);
    console.log('onSpeechStart: ', e);
    setStarted('β');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('β');
  };

  const onSpeechEnd = (e: any) => {
    setIsProgress(false);
    console.log('onSpeechEnd: ', e);
    setEnd('β');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setIsProgress(false);
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    setIsProgress(false);
    console.log(isProgress);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);

    setPartialResults(e.value);
    // setMessages(e.value[0]);
    // setSpeech(e.value[0]);
  };

  const onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('ko-KR');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  // const _stopRecognizing = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const _cancelRecognizing = async () => {
  //   try {
  //     await Voice.cancel();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const _destroyRecognizer = async () => {
  //   try {
  //     await Voice.destroy();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   _clearState();
  // };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  const _clearBody = () => {
    body.routeId = '';
    body.departureTer = '';
    body.arrivalTer = '';
    body.date = '';
    body.time = '';
    body.startTime = '';
    body.arrivalTime = '';
    body.corName = '';
    body.charge = '';
    body.seat = '';
    body.rotId = '';
    body.duration = '';
  };

  const onSend = useCallback(
    (messages = []) => {
      // console.log(messages[0].text);
      const responseMessages = {
        _id: uuid.v4(),
        text: messages,
        createdAt: new Date(),
        user: USER,
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, responseMessages),
      );
      console.log(messages);

      _clearState();
      // dummy();

      const stringSearch = messages.toString().search(/^μλ§€ν΄ μ€|^μλ§€/);
      const seatStringSearch = messages.toString().replace(/[^0-9]/g, '');
      const number = parseInt(seatStringSearch);
      const isA = /^\d{1,2}λ²/;
      const isB = /^\d{1,2}$/;

      const resetObject = messages
        .toString()
        .search(/κ·Έλ§|μ·¨μ|λ€μ|μ΄κΈ°ν|stop|μ€ν|μ€ν±|μ²μλΆν°/);

      console.log(number);
      console.log(stringSearch);
      console.log(isA.test(messages), isB.test(messages));

      console.log('career');
      console.log(career);

      if (stringSearch === 0) {
        pickSeat();
      } else if (isA.test(messages) || isB.test(messages)) {
        reserveTicket(number);
      } else if (resetObject === 0) {
        resetChatting();
      } else {
        requestToAI(messages);
      }
      console.log('μ΄κ³³μ λ§μ§λ§ μλλ€.');
      console.log(career);
    },
    [career, body, maxSeat, seatInfo],
  );

  // const handleOnPress = useCallback(() => {
  //   if (messages && onSend) {
  //     onSend({text: messages.trim()});
  //   }
  // }, [messages, onSend]);

  // const renderComposer = (props: any) => {
  //   return (
  //     <View style={{flexDirection: 'row'}}>
  //       <Composer {...props} />
  //       <TouchableOpacity
  //         onPress={_startRecognizing}
  //         style={{backgroundColor: 'D1E7F3', justifyContent: 'center'}}>
  //         <Image
  //           style={{
  //             width: 40,
  //             height: 40,
  //             resizeMode: 'contain',
  //           }}
  //           source={{
  //             uri: 'https://user-images.githubusercontent.com/79521972/182748280-83cb4879-76e5-48d0-bb5c-f5420a34bc62.png',
  //           }}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const renderInputToolbar = (props: any) => {
  //   return (
  //     <InputToolbar
  //       {...props}
  //       onSend={onSend}
  //       // onTyping={this.props.onHandleTyping}
  //       // containerStyle={styles.inputToolbarStyle}
  //     />
  //   );
  // };

  // const onSend2 = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  // const renderSend = (sendProps: any) => {
  //   if (sendProps.text.trim().length > 0) {
  //     return (
  //       <TouchableOpacity>
  //         <Image
  //           style={{width: 50, height: 50, resizeMode: 'contain'}}
  //           source={require('../assets/send.png')}
  //         />
  //       </TouchableOpacity>
  //     );
  //   }
  //   return null;
  // };
  /*
  const data = {
    isSuccess: true,
    code: 0,
    message: 'λ§μνμ  μμ²­μ¬ν­μ λ°λ₯Έ μΆμ² λ°°μ°¨ μ λ³΄μλλ€.',
    result: {
      departure: 'λμμΈ',
      arrival: 'μ μ² μ',
      LINE: {
        corName: 'κ²½κΈ°κ³ μ',
        time: '1430',
        rotId: 'RT201603173067324',
        rotSqno: '1',
        busGrade: 'IDG',
        alcnSqno: '2006',
        durationTime: 120,
      },
    },
  };

  const dummy = async () => {
    const responseMessages = {
      _id: uuid.v4(),
      text:
        //json.message
        data.message +
        '\n' +
        '1. μΆλ°μ§:' +
        data.result.departure +
        '2. λμ°©μ§:' +
        data.result.arrival +
        '3. μΆλ° μκ°:' +
        data.result.LINE.time +
        '4. μμ λμ°© μκ°:' +
        data.result.LINE.durationTime +
        "\nλ§μ½ μμ νκ³  μΆμ μ λ³΄κ° μλ€λ©΄ ν΄λΉνλ λ²νΈλ₯Ό λ§μν΄ μ£ΌμΈμ.\nκ·Έλ μ§ μκ³  κ·Έλλ‘ μλ§€λ₯Ό μ§ννκΈ°λ₯Ό μνλ©΄ 'μμ½' νΉμ 'μμ½ν΄ μ€' λΌκ³  λ§μν΄ μ£ΌμΈμ.",
      createdAt: new Date(),
      user: BOT,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, responseMessages),
    );
  };*/

  const requestToAI = async (message: string) => {
    console.log('requestToAI ν¨μ');
    const URL =
      'http://43.200.99.243/bus/reservation/auto/ai?' +
      'latitude=' +
      // location?.latitude.toString() +
      '37.5703702' +
      '&' +
      'longitude=' +
      '126.9850312';
    // location?.longitude.toString();

    console.log(URL);

    // console.log(body);

    try {
      // console.log('asdfasdf');
      // console.log(objectList);
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          string: message,
          object: {
            terSfr: career.terSfr,
            terSto: career.terSto,
            date: career.date,
            time: career.time,
            arrTime: career.arrTime,
          },
        }),
      });

      const json = await response.json();
      console.log('json!!!!!!');
      console.log(json);

      setCareer(prevState => ({
        // terSfr: 'fe',
        // terSto: 'sdf',
        // date: 'sdf',
        // time: 'eeg',
        // arrTime: 'ggg',
        // ...prevState,
        terSfr: json.result?.params.terSfr,
        terSto: json.result?.params.terSto,
        date: json.result?.params.date,
        time: json.result?.params.time,
        arrTime: json.result?.params.arrTime,
      }));

      // console.log('career');
      // console.log(career);

      setBody(prevState => ({
        ...prevState,
        routeId: json.result?.routeId ?? '',
        date: json.result?.date ?? '',
        time: json.result?.LINE?.time ?? '',
        rotId: json.result?.LINE?.rotId ?? '',
        corName: json.result?.LINE?.corName ?? '',
        duration: json.result?.LINE?.durationTime ?? '',
      }));

      // body.routeId = json.result?.routeId ?? '';
      // body.date = json.result?.date ?? '';
      // body.time = json.result?.LINE?.time ?? '';
      // body.rotId = json.result?.LINE?.rotId ?? '';
      // body.corName = json.result?.LINE?.corName ?? '';
      // body.duration = json.result?.LINE?.durationTime ?? '';

      // console.log('body');
      // console.log(body);

      let responseMessages;

      if (json.isSuccess && json.message.length > 20) {
        let hour = 0;
        let min = 0;

        let start = [
          json.result.LINE.time.slice(0, 2),
          'μ ',
          json.result.LINE.time.slice(2),
          'λΆ',
        ].join('');

        const duration =
          json.result.LINE.durationTime >= 60
            ? `${Math.floor(json.result.LINE.durationTime / 60)}μκ° ${
                json.result.LINE.durationTime % 60
              } λΆ`
            : `${json.result.LINE.durationTime % 60} λΆ`;

        console.log(duration);

        let newDuration = moment(json.result.LINE.durationTime).format();

        responseMessages = {
          _id: uuid.v4(),
          text:
            json.message +
            '\n' +
            '\nβͺοΈλ μ§: ' +
            moment(json.result.date, 'YYYYMMDD').format('ll') +
            '\n\n1. μΆλ°μ§: ' +
            json.result.departure +
            '\n2. λμ°©μ§: ' +
            json.result.arrival +
            '\n3. μΆλ° μκ°: ' +
            start +
            '\n4. μμ μμ μκ°: ' +
            duration +
            "\n\nβͺοΈλ§μ½ μμ νκ³  μΆμΌμλ©΄ λ°κΎΈκ³  μΆμ μ λ³΄λ§ λ€μ λ§μν΄μ£ΌμΈμ.\nβͺοΈκ·Έλ μ§ μκ³  κ·Έλλ‘ μλ§€λ₯Ό μ§ννκΈ° μνλ©΄ 'μλ§€' νΉμ 'μλ§€ν΄ μ€' λΌκ³  λ§μν΄ μ£ΌμΈμ.",
          createdAt: new Date(),
          user: BOT,
        };
      } else {
        responseMessages = {
          _id: uuid.v4(),
          text: json.message,
          createdAt: new Date(),
          user: BOT,
        };
      }

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, responseMessages),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const pickSeat = async () => {
    console.log('pickSeat ν¨μ');
    console.log(body);
    let url =
      'http://43.200.99.243/bus/seat/list?' +
      'routeId=' +
      body.routeId +
      '&date=' +
      body.date +
      '&time=' +
      body.time;

    console.log(url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);

      //console.log(json.isSuccess);
      let responseMessages;

      if (json.isSuccess) {
        let list = json.result.SEAT_LIST;

        // console.log(JSON.stringify(json.result.SEAT_LIST));

        // const seat = JSON.stringify(json.result.SEAT_LIST);
        // const seatList = seat.split(',');
        // console.log(seatList);
        // const seatResult = seat.map(object => {
        //   typeof object
        // })

        setBody(prevState => ({
          ...prevState,
          charge: json.result.FEE,
        }));

        // body.charge = json.result.FEE;

        let resultFee = json.result.FEE;
        let regexp = /\B(?=(\d{3})+(?!\d))/g;
        let resultCharge = resultFee.toString().replace(regexp, ',');

        let stringSeat = JSON.stringify(json.result.SEAT_LIST);
        let seatTrim = stringSeat.slice(1, -1);
        //console.log(seatTrim);
        let seatList = seatTrim.split(',');

        let result = seatList.map((data, index) => JSON.parse(data));

        setMaxSeat(result.length);

        let x = new Array(36);
        for (let i in result) {
          // if (parseInt(i) + 1 === 3 || 7 || 11 || 15 || 19 || 23 || 27 || 31) {
          //   x[i] = ' ';
          // }
          // console.log(result[i][parseInt(i) + 1]);
          if (result[i][parseInt(i) + 1] === 'N') {
            seatInfo[i] = 'X';
          } else {
            seatInfo[i] = parseInt(i) + 1;
          }
        }

        let filtered = seatInfo.filter(item => item !== undefined);

        console.log(filtered);

        responseMessages = {
          _id: uuid.v4(),
          text:
            // json.message +
            'βͺοΈκ°κ²© μ λ³΄ : μΌλ° 1λͺ (' +
            resultCharge +
            'μ) \n\n' +
            '\n' +
            'βͺοΈμμ¬ μ’μ κ°μ :' +
            json.result.REST_SEAT_CNT +
            'μ\nβͺοΈμ’μ μ λ³΄ :\n' +
            filtered +
            "\n\nβͺοΈκ·Έλ¦Όμ ν΄λ¦­νμ¬ μ’μμ νμΈνκ³  λ¨μμλ μ’μ μ€ μνμλ μ’μμ λ²νΈλ₯Ό λ§μν΄μ£ΌμΈμ (μμ : '21λ²' νΉμ '21')",
          createdAt: new Date(),
          user: BOT,
          image:
            'https://raw.githubusercontent.com/speardragon/save-image-repo/main/img/image-20220918185347921.png',
        };
      } else if (!json.isSuccess) {
        responseMessages = {
          _id: uuid.v4(),
          text: json.message,
          createdAt: new Date(),
          user: BOT,
        };
      }

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, responseMessages),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const resetChatting = async () => {
    _clearBody();
    let responseMessages;
    // dispatch(
    //   setObject({
    //     // terSfr: json.result.params?.terSfr,
    //     // terSto: json.result.params?.terSto,
    //     // date: json.result.params?.date,
    //     // time: json.result.params?.time,
    //     // arrTime: json.result.params?.arrTime,
    //     terSfr: '',
    //     terSto: '',
    //     date: '',
    //     time: '',
    //     arrTime: '',
    //   }),
    // );

    setCareer({
      terSfr: '',
      terSto: '',
      date: '',
      time: '',
      arrTime: '',
    });

    responseMessages = {
      _id: uuid.v4(),
      text: 'μνμλ μ λ³΄λ₯Ό μ²μλΆν° λ€μ λ§μν΄ μ£ΌμΈμ.',
      createdAt: new Date(),
      user: BOT,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, responseMessages),
    );
  };

  const reserveTicket = async number => {
    console.log(number, maxSeat);

    if (
      number > maxSeat ||
      seatInfo[parseInt(number) + 1] == 'X' ||
      seatInfo[parseInt(number) + 1] <= 0
    ) {
      let responseMessages = {
        _id: uuid.v4(),
        text: 'ν΄λΉ μ’μμ μλ§€ν  μ μμ΅λλ€. λ€λ₯Έ μ’μμ κ³¨λΌμ£ΌμΈμ.',
        createdAt: new Date(),
        user: BOT,
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, responseMessages),
      );
    }

    console.log('reserveTicket ν¨μ');
    let url = 'http://43.200.99.243/bus/reservation/ticket';

    // console.log(data);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          routeId: body.routeId,
          date: body.date,
          startTime: body.time,
          charge: body.charge,
          rotId: body.rotId,
          seat: number,
          duration: body.duration,
        }),
      });

      const json = await response.json();

      console.log('json');
      console.log(json);

      const ticketObject = {
        ...body,
      };
      dispatch(setTicketInfo(ticketObject));

      console.log('ticketinfo');
      console.log(ticketInfo);

      console.log(json.isSuccess);
      let responseMessages;

      if (json.isSuccess) {
        responseMessages = {
          _id: uuid.v4(),
          text: json.message,
          createdAt: new Date(),
          user: BOT,
        };
      } else if (!json.isSuccess) {
        responseMessages = {
          _id: uuid.v4(),
          text: json.message,
          createdAt: new Date(),
          user: BOT,
        };
      }

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, responseMessages),
      );
      _clearBody();
    } catch (error) {
      console.log(error);
    }
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#F6F6CC',
          },
          left: {
            backgroundColor: '#D1E7F3',
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
        time
      />
    );
  };

  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: 'gray',
          },
          left: {
            color: 'gray',
          },
        }}
      />
    );
  };

  const renderActions = (props: Readonly<ActionsProps>) => {
    return (
      <>
        <Actions
          {...props}
          icon={() => (
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://user-images.githubusercontent.com/79521972/182748280-83cb4879-76e5-48d0-bb5c-f5420a34bc62.png',
              }}
            />
          )}
          onSend={args => console.log(args)}
        />
      </>
    );
  };

  let mic;
  let sendButton;

  if (results.length !== 0) {
    sendButton = (
      <TouchableOpacity
        onPress={() => {
          onSend(results[0]);
        }}
        style={{
          marginVertical: 13,
          flex: 5,
          backgroundColor: '#DFDEDE',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          marginLeft: 15,
        }}>
        <View>
          <Text style={styles.stat}>
            {isProgress ? partialResults[0] : results[0]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    sendButton = (
      <View
        style={{
          marginVertical: 13,
          flex: 5,
          backgroundColor: '#DFDEDE',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          marginLeft: 15,
        }}>
        <View>
          <Text style={styles.stat}>
            {isProgress ? partialResults[0] : results[0]}
          </Text>
        </View>
      </View>
    );
  }

  if (!isProgress) {
    mic = (
      <TouchableOpacity
        // onPress={() => {
        //   onSend('λ΄μΌ μΈμ° κ°λ');
        // }}
        onPress={_startRecognizing}
        style={{justifyContent: 'center'}}>
        <Image
          style={{
            width: 70,
            height: 70,
            resizeMode: 'contain',
          }}
          source={require('../assets/MAIN_MIC.png')}
        />
      </TouchableOpacity>
    );
  } else {
    mic = <ActivityIndicator size={70} color="#00ff00" />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => null}
          // onSend={messages => onSend(messages)}
          // disableComposer={true}
          user={USER}
          renderBubble={renderBubble}
          renderTime={renderTime}
          // renderActions={renderActions}
          // renderComposer={renderComposer}
          // text={speech}
          // onInputTextChanged={setMessages}
        />
      </View>
      <View style={{height: '15%', flexDirection: 'row'}}>
        {sendButton}
        {mic}
        {/* <TouchableOpacity
          onPress={_startRecognizing}
          style={{backgroundColor: 'D1E7F3', justifyContent: 'center'}}>
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
            source={require('../assets/MAIN_MIC.png')}
          />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    justifyContent: 'space-evenly',
  },
  textInput: {
    bottom: 0,
    height: 40,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: 'black',

    marginBottom: 1,
  },
  nonStat: {
    textAlign: 'center',
    color: 'white',
  },
});
/*

// import React, { useState, useEffect } from "react";
// import Styled from "styled-components/native";
// import Voice from "react-native-voice";

// const Container = Styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #f5fcff;
// `;
// const ButtonRecord = Styled.Button``;
// const VoiceText = Styled.Text`
//   margin: 32px;
// `;
// // prettier-disabled
// const ChatScreen = () => {
//   const [isRecord, setIsRecord] = useState(false);
//   const [text, setText] = useState("");
//   const buttonLabel = isRecord ? "Stop" : "Start";
//   const voiceLabel = text
//     ? text
//     : isRecord
//     ? "Say something..."
//     : "press Start button";

//   const _onSpeechStart = () => {
//     console.log("onSpeechStart");
//     setText("");
//   };
//   const _onSpeechEnd = () => {
//     console.log("onSpeechEnd");
//   };
//   const _onSpeechResults = (event) => {
//     console.log("onSpeechResults");
//     setText(event.value[0]);
//   };
//   const _onSpeechError = (event) => {
//     console.log("_onSpeechError");
//     console.log(event.error);
//   };

//   const _onRecordVoice = () => {
//     if (isRecord) {
//       Voice.stop();
//     } else {
//       Voice.start("en-US");
//     }
//     setIsRecord(!isRecord);
//   };

//   useEffect(() => {
//     Voice.onSpeechStart = _onSpeechStart;
//     Voice.onSpeechEnd = _onSpeechEnd;
//     Voice.onSpeechResults = _onSpeechResults;
//     Voice.onSpeechError = _onSpeechError;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);
//   return (
//     <Container>
//       <VoiceText>{voiceLabel}</VoiceText>
//       <ButtonRecord onPress={_onRecordVoice} title={buttonLabel} />
//     </Container>
//   );
// };

// export default ChatScreen;

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
// } from "react-native";

// import Voice, {
//   SpeechRecognizedEvent,
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from "@react-native-voice/voice";

// function ChatScreen() {
//   const [recognized, setRecognized] = useState("");
//   const [volume, setVolume] = useState("");
//   const [error, setError] = useState("");
//   const [end, setEnd] = useState("");
//   const [started, setStarted] = useState("");
//   const [results, setResults] = useState([]);
//   const [partialResults, setPartialResults] = useState([]);

//   useEffect(() => {
//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechRecognized = onSpeechRecognized;
//     Voice.onSpeechEnd = onSpeechEnd;
//     Voice.onSpeechError = onSpeechError;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechPartialResults = onSpeechPartialResults;
//     Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechStart = (e: any) => {
//     console.log("onSpeechStart: ", e);
//     setStarted("β");
//   };

//   const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
//     console.log("onSpeechRecognized: ", e);
//     setRecognized("β");
//   };

//   const onSpeechEnd = (e: any) => {
//     console.log("onSpeechEnd: ", e);
//     setEnd("β");
//   };

//   const onSpeechError = (e: SpeechErrorEvent) => {
//     console.log("onSpeechError: ", e);
//     setError(JSON.stringify(e.error));
//   };

//   const onSpeechResults = (e: SpeechResultsEvent) => {
//     console.log("onSpeechResults: ", e);
//     setResults(e.value);
//   };

//   const onSpeechPartialResults = (e: SpeechResultsEvent) => {
//     console.log("onSpeechPartialResults: ", e);
//     setPartialResults(e.value);
//   };

//   const onSpeechVolumeChanged = (e: any) => {
//     console.log("onSpeechVolumeChanged: ", e);
//     setVolume(e.value);
//   };

//   const _startRecognizing = async () => {
//     _clearState();
//     try {
//       await Voice.start("ko-KR");
//       console.log("called start");
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const _stopRecognizing = async () => {
//     try {
//       await Voice.stop();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const _cancelRecognizing = async () => {
//     try {
//       await Voice.cancel();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const _destroyRecognizer = async () => {
//     try {
//       await Voice.destroy();
//     } catch (e) {
//       console.error(e);
//     }
//     _clearState();
//   };

//   const _clearState = () => {
//     setRecognized("");
//     setVolume("");
//     setError("");
//     setEnd("");
//     setStarted("");
//     setResults([]);
//     setPartialResults([]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
//       <Text style={styles.instructions}>
//         Press the button and start speaking.
//       </Text>
//       <Text style={styles.stat}>{`Started: ${started}`}</Text>
//       <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
//       <Text style={styles.stat}>{`Volume: ${volume}`}</Text>
//       <Text style={styles.stat}>{`Error: ${error}`}</Text>
//       <Text style={styles.stat}>Results</Text>
//       {results.map((result, index) => {
//         return (
//           <Text key={`result-${index}`} style={styles.stat}>
//             {result}
//           </Text>
//         );
//       })}
//       <Text style={styles.stat}>Partial Results</Text>
//       {partialResults.map((result, index) => {
//         return (
//           <Text key={`partial-result-${index}`} style={styles.stat}>
//             {result}
//           </Text>
//         );
//       })}
//       <Text style={styles.stat}>{`End: ${end}`}</Text>
//       <TouchableHighlight onPress={_startRecognizing}>
//         <Image style={styles.button} source={require("./button.png")} />
//       </TouchableHighlight>
//       <TouchableHighlight onPress={_stopRecognizing}>
//         <Text style={styles.action}>Stop Recognizing</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={_cancelRecognizing}>
//         <Text style={styles.action}>Cancel</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={_destroyRecognizer}>
//         <Text style={styles.action}>Destroy</Text>
//       </TouchableHighlight>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     width: 50,
//     height: 50,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//   },
//   action: {
//     textAlign: "center",
//     color: "#0000FF",
//     marginVertical: 5,
//     fontWeight: "bold",
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5,
//   },
//   stat: {
//     textAlign: "center",
//     color: "#B0171F",
//     marginBottom: 1,
//   },
// });

// export default ChatScreen;
*/
