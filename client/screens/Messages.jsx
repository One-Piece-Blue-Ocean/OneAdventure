import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ChannelList } from 'stream-chat-expo';

import UserContext from '../context';
import { useChatContext } from '../chatContext';

function MessagesScreen(props) {
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
        navigation.navigate('Message', { chatName: channel.data.name });
      }}
    />
  );
}

MessagesScreen.propTypes = {
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

export default MessagesScreen;
