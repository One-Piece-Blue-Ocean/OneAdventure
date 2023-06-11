import React from 'react';
import {
  Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, Skeleton,
} from 'native-base';
import PropTypes from 'prop-types';

import { categoryTheme, myTheme } from '../screens/Themes';

// TODO: Need to implement the badge/tokens to represent friends.

function Card({
  event, loaded,
}) {
  const descriptionPreview = (string) => {
    const stringArray = string.split(' ').splice(0, 22);
    return `${stringArray.join(' ')}...`;
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
