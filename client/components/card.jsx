import React, { useState } from 'react';
import {
  Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, Skeleton, IconButton,
} from 'native-base';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

import { categoryTheme, myTheme, muted } from '../screens/Themes';

// TODO: Need to implement the badge/tokens to represent friends.
// const testEvent = {
//   name: 'Testing the Test',
//   category: 'Hiking',
//   location: 'To the unknown',
// eslint-disable-next-line max-len
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   date: '11/3/23',
//   star: true,
//   friends: [],
//   imageUrl: 'https://images.unsplash.com/photo-1682686580950-960d1d513532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
// };

function Card({
  event, loaded,
}) {
  const [star, setStar] = useState(event.star);

  const descriptionPreview = (string) => {
    const stringArray = string.split(' ').splice(0, 22);
    return `${stringArray.join(' ')}...`;
  };

  const handleInterested = () => {
    setStar(!star);
    // TODO Post to database when available.
  };

  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        width="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
      >
        <Box>
          <Skeleton height={{ base: 250 }} isLoaded={loaded}>
            <AspectRatio height={{ base: 250 }} w="100%" ratio={16 / 9}>
              <Image
                source={{ uri: event.imageUrl }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg={categoryTheme[event.category.toLowerCase()]}
              _dark={{ bg: 'violet.400' }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'sm',
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              { event.category }
            </Center>
            <Center>
              <IconButton
                variant="ghost"
                colorScheme={star ? muted.gold : muted.white}
                _icon={{
                  as: FontAwesome,
                  name: 'star',
                }}
                position="absolute"
                bottom="200"
                left="85%"
                size="lg"
                onPress={() => handleInterested()}
              />
            </Center>
          </Skeleton>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Skeleton.Text
              lines={1}
              isLoaded={loaded}
            >
              <Heading size="md" ml="-1">
                { event.name }
              </Heading>
            </Skeleton.Text>
            <Skeleton.Text
              lines={1}
              isLoaded={loaded}
              _line={{ width: '50%' }}
            >
              <Text
                color={categoryTheme[event.category.toLowerCase()]}
                fontSize="xs"
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                { event.location }
              </Text>
            </Skeleton.Text>
          </Stack>
          <Skeleton.Text lines={4} isLoaded={loaded}>
            <Text fontWeight="400">
              { descriptionPreview(event.description) }
            </Text>
          </Skeleton.Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Skeleton.Text lines={1} isLoaded={loaded} _line={{ width: '50%' }}>
                <Text color={myTheme.text} fontWeight="400">
                  { event.date }
                </Text>
              </Skeleton.Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    star: PropTypes.bool.isRequired,
    // TODO: Update once we figure out friends object
    friend: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }),
    ),
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default Card;
