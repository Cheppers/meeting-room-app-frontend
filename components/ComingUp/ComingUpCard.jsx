import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'transparent',
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 16 / 2,
    borderStyle: 'solid',
  },
  eventListContainer: {
    flexDirection: 'column',
    marginLeft: 32,
  },
  eventTime: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    maxWidth: '100%',
    paddingRight: 10,
  },
});


const ComingUpCard = ({ event, translateX, isOccupied }) => {
  if (event === null) {
    return null;
  }
  const timeFormat = (time) => moment(time).format('HH:mm');
  return (
    translateX
      ? (
        <Animated.View style={{ ...styles.cardContainer, transform: [{ translateX }] }}>
          <View style={{ ...styles.circle, borderColor: isOccupied ? '#BF1756' : '#1BFCBE' }} />
          <View style={styles.eventListContainer}>
            <Text style={styles.eventTime}>{`${timeFormat(event.start)} - ${timeFormat(event.end)}`}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.eventTitle}>{event.summary}</Text>
          </View>
        </Animated.View>
      )
      : (
        <View style={{ ...styles.cardContainer }}>
          <View style={{ ...styles.circle, borderColor: isOccupied ? '#BF1756' : '#1BFCBE' }} />
          <View style={styles.eventListContainer}>
            <Text style={styles.eventTime}>{`${timeFormat(event.start)} - ${timeFormat(event.end)}`}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.eventTitle}>{event.summary}</Text>
          </View>
        </View>
      )
  );
};

ComingUpCard.propTypes = {
  event: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
  translateX: PropTypes.shape({}),
  isOccupied: PropTypes.bool.isRequired,
};

ComingUpCard.defaultProps = {
  translateX: null,
};

export default ComingUpCard;
