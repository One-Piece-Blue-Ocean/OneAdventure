<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> e652aa6 (added card component)
=======
import React from 'react';
>>>>>>> 9a6d64c (adding card module)
import {
  Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, Skeleton,
} from 'native-base';
import PropTypes from 'prop-types';

import { categoryTheme, myTheme } from '../screens/Themes';

<<<<<<< HEAD
<<<<<<< HEAD
=======
// Example of Event Object to be passed into Card object
const testEvent = {
  name: 'Testing the Test',
  category: 'Hiking',
  location: 'To the unknown',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  date: '11/3/23',
  star: true,
  friends: [],
  imageUrl: 'https://images.unsplash.com/photo-1682686580950-960d1d513532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
};

>>>>>>> e652aa6 (added card component)
=======
>>>>>>> 9a6d64c (adding card module)
// TODO: Need to implement the badge/tokens to represent friends.

function Card({
  event, loaded,
}) {
  const descriptionPreview = (string) => {
    const stringArray = string.split(' ').splice(0, 22);
    return `${stringArray.join(' ')}...`;
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <Box alignItems="center" data-testid={loaded}>
=======
    <Box alignItems="center">
>>>>>>> e652aa6 (added card component)
=======
    <Box alignItems="center" data-testid={loaded}>
>>>>>>> 9a6d64c (adding card module)
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
