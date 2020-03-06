import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RESERVED_TEXT, AVAILABLE_TEXT } from '../../consts/colors';
import logos from '../../consts/Logos';

const { width } = Dimensions.get('window');
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const styles = StyleSheet.create({
  nameText: {
    fontSize: 44,
    fontWeight: '300',
    marginRight: 8,
    maxWidth: width * 0.7,
  },
  collapsableTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowStyle: {
    resizeMode: 'stretch',
    width: 48,
    height: 48,
  },
  nameTextContainer: {
    flexDirection: 'row',
    marginLeft: 52,
  },
});

const HeaderTitle = ({ onModalOpen, isOccupied, spin, event, isError }) => {
  const accessibleTextColor = isOccupied ? RESERVED_TEXT : AVAILABLE_TEXT;
  const arrowSource = isOccupied ? logos.whiteArrow : logos.blackArrow;
  const isRestOfTheDay = !isOccupied && !event;
  let eventText = event && isOccupied ? event.summary : 'Available';
  if (isRestOfTheDay) {
    eventText = 'Available - for the rest of the day';
  }
  if (isError) {
    eventText = 'Ooops! Something went wrong!';
  }

  return (
    <View style={styles.nameTextContainer}>
      <View style={styles.collapsableTextContainer}>
        {
          !isRestOfTheDay && !isError
            ? (
              <TouchableOpacity style={styles.collapsableTextContainer} onPress={onModalOpen}>
                <Text numberOfLines={1} style={{ ...styles.nameText, color: accessibleTextColor }} ellipsizeMode="tail">
                  {eventText}
                </Text>
                <AnimatedFastImage source={arrowSource} style={{ ...styles.arrowStyle, transform: [{ rotate: spin }] }} />
              </TouchableOpacity>
            ) : (
              <View style={styles.collapsableTextContainer}>
                <Text numberOfLines={1} style={{ ...styles.nameText, color: accessibleTextColor }} ellipsizeMode="tail">
                  {eventText}
                </Text>
              </View>
            )
        }
      </View>
    </View>
  );
};

HeaderTitle.propTypes = {
  isError: PropTypes.bool,
  onModalOpen: PropTypes.func,
  isOccupied: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    summary: PropTypes.string,
  }),
  spin: PropTypes.shape({}).isRequired,
};

HeaderTitle.defaultProps = {
  event: null,
  isError: false,
  onModalOpen: () => { },
};

export default HeaderTitle;
