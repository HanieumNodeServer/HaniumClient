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

interface ILocation {
  latitude: number;
  longitude: number;
}

const uer = 'asdf';
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

/*Array.matrix = function (m, n, initial) {
  let a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

let seatArray = Array.matrix(8,3,0);
console.log(seatArray);*/

type messageType = {
  id: number;
  text: string;
  createdAt: string;
};

function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  // const [speech, setSpeech] = useState('');

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  const seatData =
    '[{"1":"N"},{"2":"Y"},{"3":"N"},{"4":"Y"},{"5":"N"},{"6":"N"},{"7":"N"},{"8":"Y"},{"9":"N"},{"10":"N"},{"11":"Y"},{"12":"N"},{"13":"N"},{"14":"N"},{"15":"N"},{"16":"N"},{"17":"Y"},{"18":"N"},{"19":"N"},{"20":"Y"},{"21":"N"},{"22":"N"},{"23":"Y"},{"24":"N"},{"25":"Y"},{"26":"Y"},{"27":"N"},{"28":"Y"}]';

  const seatTrim = seatData.slice(1, -1);
  const seatList = seatTrim.split(',');

  // const result = seatList[0];

  // seatList.forEach(sdf => console.log(sdf));
  const result = seatList.map((data, index) => JSON.parse(data));

  // const x = new Array(9);
  // for (let i = 0; i < x.length; i++) {
  //   x[i] = new Array(4);
  // }
  let x = new Array(36);
  // console.log(x);

  console.log('------');

  for (let i in result) {
    if (parseInt(i) + 1 === 3 || 7 || 11 || 15 || 19 || 23 || 27 || 31) {
      x[i] = ' ';
    }
    // console.log(result[i][parseInt(i) + 1]);
    if (result[i][parseInt(i) + 1] === 'N') {
      x[i] = 'X';
    } else {
      x[i] = parseInt(i) + 1;
    }
  }
  const filtered = x.filter(item => item !== undefined);
  // console.log(filtered);

  // const display = (seatObject) => {
  //   for (let i in seatObject) {

  //   }
  // }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `안녕하세요 시외버스 예매 챗봇 AI 부릉이 입니다.\n\n<사용 예시>\n1. 내일 3시에 서울에서 부산으로 갈래\n `,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '부릉이',
          avatar: require('../assets/robot.png'),
        },
      },
    ]);
  }, []);

  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

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
        console.log('에러');
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  let body = {
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
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '예매 AI(부릉이)',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerTitleAlign: 'center',
    });
  }, []);

  // 건들면 X
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

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
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

  const onSend = useCallback((messages = []) => {
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

    let stringSearch = messages.toString().search('예약');
    const seatStringSearch = messages.toString().replace(/[^0-9]/g, '');
    const number = parseInt(seatStringSearch);
    const isA = /^\d[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const isB = /^\d{1,2}$/;

    console.log(number);
    console.log(stringSearch);
    console.log(isA.test(messages), isB.test(messages));

    if (stringSearch === 0) {
      pickSeat(body);
    } else if (isA.test(messages) || isB.test(messages)) {
      reserveTicket(body, number);
    } else {
      requestToAI(messages);
    }
    console.log(body);

    // _clearBody();
  }, []);

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
    message: '말씀하신 요청사항에 따른 추천 배차 정보입니다.',
    result: {
      departure: '동서울',
      arrival: '신철원',
      LINE: {
        corName: '경기고속',
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
        '1. 출발지:' +
        data.result.departure +
        '2. 도착지:' +
        data.result.arrival +
        '3. 출발 시간:' +
        data.result.LINE.time +
        '4. 예상 도착 시간:' +
        data.result.LINE.durationTime +
        "\n만약 수정하고 싶은 정보가 있다면 해당하는 번호를 말씀해 주세요.\n그렇지 않고 그대로 예매를 진행하기를 원하면 '예약' 혹은 '예약해 줘' 라고 말씀해 주세요.",
      createdAt: new Date(),
      user: BOT,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, responseMessages),
    );
  };*/

  const requestToAI = async (message: string) => {
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

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          string: message,
          body: {
            routeId: body.routeId,
            date: body.date,
            time: body.time,
          },
        }),
      });

      const json = await response.json();
      console.log('json' + json);
      console.log('body' + body);

      body.routeId = json.result.routeId;
      body.date = json.result.date;
      body.time = json.result.LINE.time;
      body.rotId = json.result.LINE.rotId;
      body.corName = json.result.LINE.corName;
      body.duration = json.result.LINE.durationTime;

      let responseMessages;

      console.log(json.isSuccess);

      if (json.isSuccess) {
        let hour = 0;
        let min = 0;

        let start = [
          json.result.LINE.time.slice(0, 2),
          '시 ',
          json.result.LINE.time.slice(2),
          '분',
        ].join('');

        const duration =
          json.result.LINE.durationTime >= 60
            ? `${Math.floor(json.result.LINE.durationTime / 60)}시간 ${
                json.result.LINE.durationTime % 60
              } 분`
            : `${json.result.LINE.durationTime % 60} 분`;

        console.log(duration);

        responseMessages = {
          _id: uuid.v4(),
          text:
            json.message +
            '\n' +
            '\n날짜: ' +
            json.result.date +
            '\n\n1. 출발지: ' +
            json.result.departure +
            '\n2. 도착지: ' +
            json.result.arrival +
            '\n3. 출발 시간: ' +
            start +
            '\n4. 예상 소요 시간: ' +
            duration +
            "\n\n만약 수정하고 싶으시면 다시 말씀해주세요\n그렇지 않고 그대로 예매를 진행하기를 원하면 '예약' 혹은 '예약해 줘' 라고 말씀해 주세요.",
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
    } catch (error) {
      console.log(error);
    }
  };

  const pickSeat = async data => {
    let url =
      'http://43.200.99.243/bus/seat/list?' +
      'routeId=' +
      data.routeId +
      '&date=' +
      data.date +
      '&time=' +
      data.time;

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

      console.log(json.isSuccess);
      let responseMessages;

      if (json.isSuccess) {
        let list = json.result.SEAT_LIST;

        console.log(JSON.stringify(json.result.SEAT_LIST));

        // const seat = JSON.stringify(json.result.SEAT_LIST);
        // const seatList = seat.split(',');
        // console.log(seatList);
        // const seatResult = seat.map(object => {
        //   typeof object
        // })

        body.charge = json.result.FEE;

        responseMessages = {
          _id: uuid.v4(),
          text:
            // json.message +
            '가격 정보 : 일반 1명(' +
            json.result.FEE +
            '₩) \n\n' +
            '좌석을 선택해주세요\n' +
            '\n' +
            '잔여 좌석 개수 :' +
            json.result.REST_SEAT_CNT +
            '석\n 좌석 정보 :\n' +
            JSON.stringify(json.result.SEAT_LIST) +
            "\n\n 원하시는 좌석 번호를 말씀해주세요 (예시 : '21번')",
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

  const reserveTicket = async (data, number) => {
    let url = 'http://43.200.99.243/bus/reservation/ticket';

    console.log(data);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          routeId: data.routeId,
          date: data.date,
          startTime: data.time,
          charge: data.charge,
          rotId: data.rotId,
          seat: number,
          duration: data.duration,
        }),
      });

      const json = await response.json();

      console.log('json', json);

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
        <TouchableOpacity
          onPress={() => {
            onSend(results[0]);
            // onSend('asdf');
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
          {/* <Text>{results}</Text> */}
          <View>
            <Text style={styles.stat}>{results[0]}</Text>
          </View>
          {/* {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {results[0]}
              </Text>
            );
          })} */}
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
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
//     setStarted("√");
//   };

//   const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
//     console.log("onSpeechRecognized: ", e);
//     setRecognized("√");
//   };

//   const onSpeechEnd = (e: any) => {
//     console.log("onSpeechEnd: ", e);
//     setEnd("√");
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
