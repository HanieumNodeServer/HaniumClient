import { Image, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';
import { createGiftedChatMessage, sendDialogFlowMessage, setMessagesType } from '../utils';

import styles from './styles';

interface IProps {
  text: string;
  setMessages: setMessagesType;
  setText: (arg: string) => void;
}

function Send({ text, setMessages, setText }: IProps) {
  const onSendPress = () => {
    if (text.trim()) {
      const newDate = new Date();
      setMessages((prevMessages) => GiftedChat.append(
        prevMessages,
        createGiftedChatMessage(text, newDate as unknown as number),
      ));
      sendDialogFlowMessage(text, setMessages);
      setText('');
    }
  };

  return (
    <TouchableOpacity
      style={styles.sendButton}
      onPress={onSendPress}
      testID="sendWrapper"
    >
      <Image
        style={styles.sendImage}
        testID="sendImage"
        source={require('../assets/send.png')}
      />
    </TouchableOpacity>
  );
}

export default Send;
