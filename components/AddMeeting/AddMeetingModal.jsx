import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { MODAL_COLOR, MODAL_TEXT } from '../../consts/colors';
import AdHocMeetingTime from './AdHocMeetingTime';

const styles = StyleSheet.create({
  modalStyle: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: MODAL_COLOR,
    borderRadius: 18,
    width: 360,
    height: 280,
  },
  reserveRoomStyle: {
    marginTop: 38,
    marginLeft: 48,
  },
  reserveRoomText: {
    fontSize: 24,
    color: MODAL_TEXT,
  },
});

const AddMeetingModal = ({ onScheduleEvent, adHocMeetingTimes, modalValue, event, reservingModalOpen }) => {
  const interPolate = (state, outputFrom, outputTo) => state.interpolate({
    inputRange: [0, 1],
    outputRange: [outputFrom, outputTo],
  });

  const modalOpenRight = interPolate(modalValue, 100, 132);
  const modalOpenOpacity = interPolate(modalValue, 0, 1);
  const modalZindex = interPolate(modalValue, 0, 10);
  const displayModal = reservingModalOpen ? 'flex' : 'none';
  return (
    <Animated.View style={{ ...styles.modalStyle, right: modalOpenRight, opacity: modalOpenOpacity, zIndex: modalZindex, display: displayModal }}>
      <View style={styles.reserveRoomStyle}>
        <Text style={styles.reserveRoomText}>Reserve room</Text>
      </View>
      <AdHocMeetingTime
        adHocMeetingTimes={adHocMeetingTimes}
        event={event}
        onScheduleEvent={(value) => { onScheduleEvent(value); }}
        reservingModalOpen={reservingModalOpen}
      />
    </Animated.View>
  );
};

AddMeetingModal.propTypes = {
  modalValue: PropTypes.shape({}).isRequired,
  onScheduleEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({}),
  adHocMeetingTimes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  reservingModalOpen: PropTypes.bool.isRequired,
};

AddMeetingModal.defaultProps = {
  event: null,
};

export default AddMeetingModal;
