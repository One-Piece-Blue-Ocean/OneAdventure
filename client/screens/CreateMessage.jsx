/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Input, Heading, IconButton, HStack, Center, Avatar, Text, Modal, Button, FlatList,
} from 'native-base';
import { StreamChat } from 'stream-chat';
import { Ionicons } from '@expo/vector-icons';
import {
  updateDoc,
  collection,
  doc,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { useChatContext } from '../chatContext';
import { db } from '../../database/db';
import { UserContext } from '../context';

const testData = [
  {
    category: 'hiking', chatToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUHJxWlFPWWZ5dFJjV2gzaUx4Z3B1c2V4M1FvMSJ9.IDJ6xpDXeCAZEErVJezciI3lp9iWNqSWw6K4eMlhkkM', email: 'ChatBot2@gmail.com', fullName: 'Chat Bot2', profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png', radius: '10', uid: 'PrqZQOYfytRcWh3iLxgpusex3Qo1', zipcode: '94122',
  }, {
    category: 'biking', chatToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVEtoekptZE9Id1VUNkRHdXZCNUp5YzdHU2pFMiJ9.WcJnMyDOIDg5UJpIFFQMa3nfKA1PjXXr7DhxO-z9xrY', email: 'test1234@test1234.com', fullName: 'Test1234', radius: '10', uid: 'TKhzJmdOHwUT6DGuvB5Jyc7GSjE2', zipcode: '99999',
  }, {
    category: 'Sailing', chatToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUXF5VXdZZGRjSWJER2Q5bG5OOVJQZkdvUUhDMiJ9.Ko8BIqoZuIqOP-ExOGWlVn_1jbNwVe9LJ2BwLoRXIAw', email: 'nb@aol.com', fullName: 'boah', profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png', radius: '10', uid: 'QqyUwYddcIbDGd9lnN9RPfGoQHC2', zipcode: '94123',
  }, {
    category: 'hiking', email: 'e@e.com', fullName: 'jacqueline', profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png', radius: '10', uid: '8eSNW7SqbpVpe1NzD9XR3f4yclg1', zipcode: '95616',
  }];

const FriendCardStyle = StyleSheet.create({
  left: {
    width: '30%',
    margin: 10,
  },
  middle: {
    width: '40%',
  },
  right: {
    width: '30%',
  },
  container: {
    margin: 5,
    backgroundColor: 'white',
    radius: 25,
  },
});

function FriendCard({ friend, members, setMembers }) {
  const [add, setAdd] = useState(members.filter(((member) => member.uid === friend.uid)).length);

  useEffect(() => {
    setAdd(members.filter(((member) => member.uid === friend.uid)).length);
  }, [members]);

  const toggleAdd = () => {
    const addUser = !add;
    setAdd(addUser);
    if (addUser) {
      setMembers([...members, friend]);
    } else {
      setMembers(members.filter((member) => member.uid !== friend.uid));
    }
  };

  return (
    <HStack style={FriendCardStyle.container} rounded="md" shadow={3}>
      <Center style={FriendCardStyle.left}>
        <Avatar source={{ uri: friend.profilePhoto }} />
      </Center>
      <Center style={FriendCardStyle.middle}>
        <Text>
          {friend.fullName}
        </Text>
      </Center>
      <Center style={FriendCardStyle.right}>
        <IconButton
          // colorScheme="indigo"
          variant="ghost"
          _icon={
            add ? { as: Ionicons, name: 'add-circle-sharp' } : { as: Ionicons, name: 'add-circle-outline' }
          }
          onPress={toggleAdd}
          size="lg"
        />
      </Center>
    </HStack>
  );
}

const CreateMessageStyles = StyleSheet.create({
  modal: {
    width: '90%',
    margin: 15,
    height: '90%',
  },
  container: {
    margin: 15,
    height: '95%',
  },
  section: {
    paddingBottom: 10,
  },
  buttons: {
    bottom: 5,
    justifyContent: 'center',
    padding: 5,
  },
  list: {
    height: '80%',
  },
});

function CreateMessage({ navigation }) {
  const chatClient = useChatContext();
  const { user } = useContext(UserContext);
  const [chatName, setChatName] = useState('');
  const [friends, setFriends] = useState(testData);
  const [members, setMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // const channel = chatClient.channel('messaging', {
  //   image: 'dave.png',
  //   name: 'Create a Messaging Channel',
  //   members: ['dave-matthews', 'trey-anastasio'],
  //   // option to add custom fields
  // });

  const userId = user.uid;
  const getFriends = () => (
    // console.log('getFriends userid------->', userId);
    getDocs(collection(db, 'pirates', userId, 'friends'))
      .then((friendsDocs) => {
        const promiseArr = friendsDocs.docs.map((singleFriendsDoc) => {
          const currentFriend = singleFriendsDoc.data().friendId;
          // console.log(singleFriendsDoc.data(), 'MY CURRENT FRIEND~~~!!!', currentFriend);
          return getDoc(doc(db, 'pirates', currentFriend))
            .then((friendDoc) => friendDoc.data());
        });
        return Promise.all(promiseArr).then((friendDocs) => {
          setFriends(friendDocs);
          return friendDocs;
        });
      })
  );

  useEffect(() => {

  }, []);

  return (
    <>
      <View style={CreateMessageStyles.container}>
        <View style={CreateMessageStyles.section}>
          <Heading size="lg" bold> Crew Name: </Heading>
          <Input variant="rounded" placeholder="Name your crew..." />
        </View>
        <View style={CreateMessageStyles.section}>
          <Heading size="lg" bold> Friends: </Heading>
          <FlatList
            data={members}
            style={CreateMessageStyles.list}
            renderItem={({ item }) => (
              <FriendCard
                friend={item}
                members={members}
                setMembers={setMembers}
              />
            )}
          />
          <Button.Group style={CreateMessageStyles.buttons}>
            <IconButton
              variant="solid"
              _icon={{
                as: Ionicons,
                name: 'person-add-sharp',
              }}
              onPress={() => setModalVisible(!modalVisible)}
              size="md"
            />
            <Button
              size="md"
              isDisabled={members.length === 0}
            >
              Chat with my crew!
            </Button>
          </Button.Group>
        </View>
      </View>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(!modalVisible)}
        size="full"
        style={CreateMessageStyles.modal}
        safeAreaTop
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Friends:</Modal.Header>
          <FlatList
            data={friends}
            renderItem={({ item }) => (
              <FriendCard
                friend={item}
                members={members}
                setMembers={setMembers}
              />
            )}
          />
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => {
                setModalVisible(false);
              }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default CreateMessage;
