import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MODAL_TEXT, RESERVED_COLOR } from '../../consts/colors';

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
  },
});

const CancelMeetingActionButton = ({ cancelValue, onModalOpen, cancelModal }) => {
  const interPolate = (state, from, to) => state.interpolate({
    inputRange: [0, 1],
    outputRange: [from, to],
  });

  const spin = interPolate(cancelValue, '225deg', '45deg');
  const modalBackGroundColor = interPolate(cancelValue, MODAL_TEXT, RESERVED_COLOR);
  const modalTextColor = interPolate(cancelValue, RESERVED_COLOR, MODAL_TEXT);
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  return (
    <Animated.View style={{ ...styles.floatingActionButtonStyle, backgroundColor: modalBackGroundColor, transform: [{ rotate: spin }] }}>
      {
        !cancelModal
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

CancelMeetingActionButton.propTypes = {
  cancelValue: PropTypes.shape({}).isRequired,
  onModalOpen: PropTypes.func.isRequired,
  cancelModal: PropTypes.bool.isRequired,
};

export default CancelMeetingActionButton;
