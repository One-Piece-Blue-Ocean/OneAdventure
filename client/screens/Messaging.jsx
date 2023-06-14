import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { createStackNavigator } from '@react-navigation/stack';

import useChatClient from '../hooks/useChatClient';
import { ChatProvider } from '../chatContext';

import MessagesScreen from './Messages';
import MessageScreen from './Message';
import CreateMessageScreen from './CreateMessage';

function MessagingScreen({ navigation }) {
  const clientIsReady = useChatClient();

  const ChatStack = createStackNavigator();
  const chatClient = StreamChat.getInstance('626qs6wjba72');

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <ChatProvider>
      <OverlayProvider>
        <Chat client={chatClient}>
          <ChatStack.Navigator>
            <ChatStack.Screen
              name="Messages"
              component={MessagesScreen}
              options={{
                headerLeft: () => {},
              }}
            />
            <ChatStack.Screen
              name="Message"
              component={MessageScreen}
            />
            <ChatStack.Screen
              name="CreateMessage"
              component={CreateMessageScreen}
              options={{
                title: 'Compose Message',
              }}
            />
          </ChatStack.Navigator>
        </Chat>
      </OverlayProvider>
    </ChatProvider>
  );
}

MessagingScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  }).isRequired,
};

export default MessagingScreen;
