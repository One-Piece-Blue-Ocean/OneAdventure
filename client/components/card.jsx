import React from 'react';
import {
  Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, Skeleton, IconButton,
} from 'native-base';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

import {
  // categoryTheme,
  myTheme, muted,
} from '../screens/Themes';

// TODO: Need to implement the badge/tokens to represent friends.

function Card({
  event,
  userEvent,
  userEventId,
  loaded,
  toggleField,
  onStarPress,
}) {
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
                src={event.imageUrl}
                alt="image"
              />
            </AspectRatio>
            <Center>
              <IconButton
                variant="ghost"
                colorScheme={userEvent.interested ? muted.gold : muted.grey}
                _icon={{
                  as: FontAwesome,
                  name: 'star',
                }}
                position="absolute"
                bottom="200"
                left="85%"
                size="lg"
                onPress={(e) => {
                  e.preventDefault();
                  toggleField(userEventId, 'interested', [userEvent.interested]);
                  onStarPress(event);
                }}
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
                { event.title }
              </Heading>
            </Skeleton.Text>
            <Skeleton.Text
              lines={1}
              isLoaded={loaded}
              _line={{ width: '50%' }}
            >
              <Text
                fontSize="xs"
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                { event.address }
              </Text>
            </Skeleton.Text>
          </Stack>
          <Skeleton.Text lines={4} isLoaded={loaded}>
            <Text fontWeight="400">
              { event.description }
            </Text>
          </Skeleton.Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Skeleton.Text lines={1} isLoaded={loaded} _line={{ width: '50%' }}>
                <Text color={myTheme.text} fontWeight="400">
                  { event.date }
                </Text>
                <Text color={myTheme.text} fontWeight="400">
                  { userEvent.attending ? ' Attending' : ' Not Attending' }
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
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  userEvent: PropTypes.shape({
    interested: PropTypes.bool.isRequired,
    attending: PropTypes.bool.isRequired,
  }).isRequired,
  userEventId: PropTypes.string.isRequired,
  loaded: PropTypes.bool,
  toggleField: PropTypes.func.isRequired,
  onStarPress: PropTypes.func,
};

Card.defaultProps = {
  loaded: false,
  onStarPress: () => {},
};

export default Card;
