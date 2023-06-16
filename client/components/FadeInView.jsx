/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

function FadeInView(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default FadeInView;
