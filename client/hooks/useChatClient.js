import { useEffect, useState, useContext } from 'react';
import { StreamChat } from 'stream-chat';

import { UserContext } from '../context';

const chatClient = StreamChat.getInstance('626qs6wjba72');

const useChatClient = () => {
  const { user } = useContext(UserContext).user;
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        const chatUser = {
          id: user.uid,
          name: user.fullName,
          image: user.profilePhoto,
        };
        chatClient.connectUser(chatUser, user.chatToken);
        setClientIsReady(true);

        // connectUser is an async function. So you can
        // choose to await for it or not depending on your
        // use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from
        // offline storage first then you should render chat
        // components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          // console.log('Error at useChatClient');
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
};

export default useChatClient;
