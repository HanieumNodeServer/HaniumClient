import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import TicketingScreen from './screens/TicketingScreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            // options={{
            //   headerShown: false,
            // }}
          />

          <Stack.Screen
              name="TicketingScreen"
              component={TicketingScreen}
          />

        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

// // import 'react-native-gesture-handler';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import React from 'react';
// import HomeScreen from './screens/HomeScreen';
// import ChatScreen from './screens/ChatScreen';
// import { store } from './store';

// export default function App() {
//   const Stack = createStackNavigator();
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <SafeAreaProvider>
//           <Stack.Navigator>
//             <Stack.Screen
//               name="HomeScreen"
//               component={HomeScreen}
//               options={{
//                 headerShown: false,
//               }}
//             />
//             <Stack.Screen
//               name="ChatScreen"
//               component={ChatScreen}
//               // options={{
//               //   headerShown: false,
//               // }}
//             />
//           </Stack.Navigator>
//         </SafeAreaProvider>
//       </NavigationContainer>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React from 'react';
// import {StyleSheet, SafeAreaView} from 'react-native';
// import {Colors} from 'react-native-paper';
// import TopBar from './src/screens/TopBar';
// import Content from './src/screens/Content';
// import BottomBar from './src/screens/BottomBar';
// import palette from './src/lib/colorPalette';

// export default function App() {
//   return (
//     <SafeAreaView style={[styles.flex]}>
//       <TopBar />
//       <Content />
//       <BottomBar />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {flex: 1, backgroundColor: palette.backgroundGray},
// });

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

// function VoiceTest() {
//   const [recognized, setRecognized] = useState("");
//   const [volume, setVolume] = useState("");
//   const [error, setError] = useState("");
//   const [end, setEnd] = useState("");
//   const [started, setStarted] = useState("");
//   const [results, setResults] = useState([]);
//   const [partialResults, setPartialResults] = useState([]);

//   const [data, setData] = useState([]);

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

//   // const postResult = async () => {
//   //   try {
//   //     const response = await fetch('localhost:3000/bus/list');
//   //     const json = await response.json();
//   //     setData(json)
//   //   }
//   // }

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

// export default VoiceTest;
