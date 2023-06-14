/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
// AppContext.js

import React, { useState } from 'react';

export const ChatContext = React.createContext({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});

// eslint-disable-next-line react/prop-types
export function ChatProvider({ children }) {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();

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
