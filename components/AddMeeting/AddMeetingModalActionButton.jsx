import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MODAL_COLOR, MODAL_TEXT } from '../../consts/colors';

const styles = StyleSheet.create({
  floatingActionButtonStyle: {
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    right: 50,
    bottom: 50,
    borderRadius: 30,
    backgroundColor: MODAL_TEXT,
  },
});

const AddMeetingModalActionButton = ({ spinValue, onModalOpen, reservingModalOpen }) => {
  const interPolate = (state, from, to) => state.interpolate({
    inputRange: [0, 1],
    outputRange: [from, to],
  });

  const spin = interPolate(spinValue, '0deg', '225deg');
  const modalBackGroundColor = interPolate(spinValue, MODAL_TEXT, MODAL_COLOR);
  const modalTextColor = interPolate(spinValue, MODAL_COLOR, MODAL_TEXT);
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  return (
    <Animated.View style={{ ...styles.floatingActionButtonStyle, backgroundColor: modalBackGroundColor, transform: [{ rotate: spin }] }}>
      {
        !reservingModalOpen
          ? (
            <TouchableOpacity onPress={onModalOpen}>
              <AnimatedIcon name="add" size={40} style={{ color: modalTextColor }} />
            </TouchableOpacity>
          ) : (
            <View>
              <AnimatedIcon name="add" size={40} style={{ color: modalTextColor }} />
            </View>
          )
      }
    </Animated.View>
  );
};

AddMeetingModalActionButton.propTypes = {
  spinValue: PropTypes.shape({}).isRequired,
  onModalOpen: PropTypes.func.isRequired,
  reservingModalOpen: PropTypes.bool.isRequired,
};

export default AddMeetingModalActionButton;
