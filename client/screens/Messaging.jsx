import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { StreamChat } from 'stream-chat';
import {
  OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput
} from 'stream-chat-expo';
import { createStackNavigator } from '@react-navigation/stack';

import UserContext from '../context';
import useChatClient from '../hooks/useChatClient';
import { ChatProvider, useChatContext } from '../chatContext';

function ChannelScreen() {
  const { channel } = useChatContext();

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

function ChannelListScreen(props) {
  const { user } = useContext(UserContext);
  const { setChannel } = useChatContext();

  const filters = {
    members: {
      $in: [user.uid],
    },
  };

  const sort = {
    last_message_at: -1,
  };
  return (
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        console.log(channel);
        navigation.navigate('Message');
      }}
    />
  );
}

ChannelListScreen.propTypes = {
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
            <ChatStack.Screen name="Messages" component={ChannelListScreen} />
            <ChatStack.Screen name="Message" component={ChannelScreen} />
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
