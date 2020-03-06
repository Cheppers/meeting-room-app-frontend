import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import AnimatedProgressWheel from 'react-native-progress-wheel';


const styles = StyleSheet.create({
  progressContainer: {
    transform: [{ rotate: '-90deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
  timerContainer: {
    flex: 1,
    position: 'absolute',
    transform: [{ rotate: '90deg' }],
  },
  timerText: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
  },
});

const Progress = ({ minutes, seconds }) => (
  <View style={styles.progressContainer}>
    <AnimatedProgressWheel
      progress={100}
      size={400}
      width={40}
      animateFromValue={0}
      duration={300000}
      backgroundColor="#855164"
      color="white"
    />
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
    </View>
  </View>
);

Progress.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Progress;
