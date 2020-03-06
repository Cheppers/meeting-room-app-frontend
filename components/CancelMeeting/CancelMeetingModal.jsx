import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MODAL_TEXT, RESERVED_COLOR } from '../../consts/colors';

const styles = StyleSheet.create({
  modalStyle: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: RESERVED_COLOR,
    borderRadius: 18,
    width: 360,
    height: 280,
  },
  reserveRoomStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  reserveRoomText: {
    marginTop: 30,
    fontSize: 24,
    color: MODAL_TEXT,
  },
  helperText: {
    marginTop: 15,
    fontSize: 16,
    color: MODAL_TEXT,
  },
  reserveListItemText: {
    fontSize: 24,
    color: MODAL_TEXT,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 90,
    marginTop: 90,
  },
});

const CancelMeetingModal = ({ onCancelEvent, cancelValue, cancelModal }) => {
  const interPolate = (state, from, to) => state.interpolate({
    inputRange: [0, 1],
    outputRange: [from, to],
  });
  const modalOpenRight = interPolate(cancelValue, 100, 132);
  const modalOpenOpacity = interPolate(cancelValue, 0, 1);
  const modalZindex = interPolate(cancelValue, 0, 10);
  return (
    <Animated.View
      style={{
        ...styles.modalStyle,
        right: modalOpenRight,
        opacity: modalOpenOpacity,
        zIndex: modalZindex,
        display: cancelModal ? 'flex' : 'none',
      }}
    >
      <View style={styles.reserveRoomStyle}>
        <Text style={styles.reserveRoomText}>ARE YOU SURE?</Text>
      </View>
      <View style={styles.reserveRoomStyle}>
        <Text style={styles.helperText}>The meeting will be canceled.</Text>
      </View>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onCancelEvent}>
          <Text style={styles.reserveListItemText}>YES</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.reserveListItemText}>NO</Text>
        </View>
      </View>
    </Animated.View>
  );
};

CancelMeetingModal.propTypes = {
  cancelValue: PropTypes.shape({}).isRequired,
  onCancelEvent: PropTypes.func.isRequired,
  cancelModal: PropTypes.bool.isRequired,
};

export default CancelMeetingModal;
