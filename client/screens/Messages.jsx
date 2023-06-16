import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'native-base';
import PropTypes from 'prop-types';
import { ChannelList } from 'stream-chat-expo';
import { Ionicons } from '@expo/vector-icons';

import { UserContext } from '../context';
import { useChatContext } from '../chatContext';
import { myTheme } from './Themes';

const buttonStyles = StyleSheet.create({
  position: 'absolute',
  bottom: 10,
  right: 10,
});

function MessagesScreen(props) {
  const { user } = useContext(UserContext).user;
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
    <>
      <ChannelList
        filters={filters}
        sort={sort}
        onSelect={(channel) => {
          const { navigation } = props;
          // console.log('At messages, setting channel to', channel.cid);
          setChannel(channel);
          navigation.navigate('Message');
        }}
      />
      <IconButton
        colorScheme={myTheme.notification}
        size="lg"
        variant="solid"
        _icon={{
          as: Ionicons,
          name: 'add-circle',
        }}
        style={buttonStyles}
        onPress={() => {
          const { navigation } = props;
          navigation.navigate('CreateMessage');
        }}
      />
    </>
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
