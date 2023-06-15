/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';

import { useChatContext } from '../chatContext';

function MessageScreen({ navigation, route }) {
  const { channel } = useChatContext();

  useEffect(() => {
    navigation.setOptions({
      title: channel.data.name || 'No title',
    });
  }, [channel]);

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

MessageScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  }).isRequired,
};

export default MessageScreen;
