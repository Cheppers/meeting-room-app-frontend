import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { BlurView } from '@react-native-community/blur';
import ComingUp from '../ComingUp/ComingUp';
import Participants from '../Participants/Participants';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
  },
  blurStyle: {
    width: '100%',
    height: '100%',
    bottom: 0,
    position: 'absolute',
  },
});

const ScheduleModal = ({ animatedValue, blurValue, viewRef, attendees, comingUp, isOccupied }) => {
  const delayValue = 500;
  const modalOpacity = blurValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const validAttenddees = attendees.filter((attendee) => Object.prototype.hasOwnProperty.call(attendee, 'full_name'));
  const isParticipants = isOccupied && validAttenddees.length;
  return viewRef
    ? (
      <Animated.View style={{ ...styles.modalContainer, opacity: modalOpacity }}>
        <BlurView style={styles.blurStyle} viewRef={viewRef} blurType="dark" blurAmount={4} />
        <View style={{ flex: 1, justifyContent: isParticipants ? 'space-between' : 'center', flexDirection: isParticipants ? 'row' : 'column' }}>
          <Participants participants={validAttenddees} delayValue={delayValue} animatedValue={animatedValue} isParticipants={isParticipants} />
          <ComingUp events={comingUp} delayValue={delayValue} animatedValue={animatedValue} isOccupied={isOccupied} isParticipants={isParticipants} />
        </View>
      </Animated.View>
    )
    : null;
};

ScheduleModal.propTypes = {
  animatedValue: PropTypes.shape({}).isRequired,
  blurValue: PropTypes.shape({
    interpolate: PropTypes.func,
  }).isRequired,
  viewRef: PropTypes.number,
  attendees: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  comingUp: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isOccupied: PropTypes.bool.isRequired,
};

ScheduleModal.defaultProps = {
  viewRef: null,
};

export default ScheduleModal;
