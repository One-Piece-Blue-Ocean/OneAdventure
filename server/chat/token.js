// useChatClient.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey } from './stream.config';

const chatClient = StreamChat.getInstance(chatApiKey);

function useChatClient() {
  const [clientIsReady, setClientIsReady] = useState(false);

  return {
    clientIsReady,
  };
};

export default chatClient;
