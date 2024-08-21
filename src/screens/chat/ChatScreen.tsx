import React, {useState} from 'react';
import {Text} from 'react-native';
import {getChat} from '../../request/chat';

const ChatScreen = ({route}: any) => {
  const [chatData, setChatData] = useState<any>([]);
  const {uid} = route.params;

  async function reqChatData() {
    try {
      const res = await getChat({uid});
      setChatData(res.data.list);
      console.log('CHAT DATA: ', res.data.list);
    } catch (error) {
      console.log(error);
    }
  }

  return <Text onLayout={reqChatData}>asdsa</Text>;
};

export default ChatScreen;
