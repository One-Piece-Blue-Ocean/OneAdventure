import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Heading, IconButton } from 'native-base';
import { StreamChat } from 'stream-chat';
import { useChatContext } from '../chatContext';
import { Ionicons } from '@expo/vector-icons';


function CreateMessage({ navigation }) {
  const chatClient = useChatContext();
  const [ chatName, setChatName] = useState('');
  const [ members, setMembers ] = useState([]);
  const [ chatTokens, setChatTokens ] = useState([]);

  // const channel = chatClient.channel('messaging', {
  //   image: 'dave.png',
  //   name: 'Create a Messaging Channel',
  //   members: ['dave-matthews', 'trey-anastasio'],
  //   // option to add custom fields
  // });

  return (
    <View>
      <View>
        <Heading size="lg" bold> Crew: </Heading>
        <Input variant="rounded" placeholder="Name your crew..." />
      </View>
      <View>
        <Heading size="lg" bold> Friends: </Heading>
        <IconButton
          // colorScheme="indigo"
          variant="outline"
          _icon={{
            as: Ionicons,
            name: "person-add-sharp"
          }}
        />
      </View>
    </View>
  );
};

export default CreateMessage;