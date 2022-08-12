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

const uer = 'asdf';
const USER = {
  _id: 1,
  name: 'Me',
};
const BOT = {
  _id: 2,
  name: 'Bot',
  avatar: '',
};

const URL =
  'http://210.178.239.160:3000/bus/reservation/auto/ai?latitude=37.6199365&longitude=127.0610036';

function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  // const [speech, setSpeech] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '안녕하세요 시외버스 예매 챗봇 AI 부릉이 입니다.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '부릉이',
          avatar: 'https://placeimg.com/140/140/any',
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '예매 AI(부릉이)',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerTitleAlign: 'center',
    });
  }, []);

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
    _clearState();
    // requestToAI(messages[0].text);
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
            source={{
              uri: 'https://user-images.githubusercontent.com/79521972/182748280-83cb4879-76e5-48d0-bb5c-f5420a34bc62.png',
            }}
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
