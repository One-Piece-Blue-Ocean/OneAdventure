/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
// AppContext.js

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';

export const ChatContext = React.createContext({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});

// eslint-disable-next-line react/prop-types
export function ChatProvider({ children }) {
  const [channel, setChannel] = useState(undefined);
  const [thread, setThread] = useState(undefined);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (channel !== undefined) {
      // const chatName = () => (channel ? channel.cid : 'undefined');
      console.log('Chat Provider Channel State -----', channel.cid);
      // navigation.navigate('Nav', {
      //   screen: 'Messaging',
      //   params: {
      //   },
      // });
    }
  }, [channel]);

  return (
    <ChatContext.Provider value={{
      channel, setChannel, thread, setThread,
    }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);
