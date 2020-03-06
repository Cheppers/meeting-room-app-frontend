import React from 'react';
import {
  View, StyleSheet, Animated, FlatList, Text, ScrollView,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import ComingUpCard from './ComingUpCard';

const styles = StyleSheet.create({
  comingUpText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  listContainer: {
    height: '80%',
    marginTop: 24,
    justifyContent: 'center',
  },
  eventTime: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

const ComingUp = ({ events, delayValue, animatedValue, isOccupied, isParticipants }) => {
  if (events === null) {
    return null;
  }
  const sencenteTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 1],
  });
  const filteredEvents = isOccupied ? events.filter((event) => !(moment().isBetween(moment(event.start), moment(event.end), null, '[]'))) : events;
  return (
    <View style={{ flex: 1, alignItems: isParticipants ? 'flex-start' : 'center', justifyContent: 'flex-start', paddingTop: 60 }}>
      <View>
        <Text style={styles.comingUpText}>Coming up:</Text>
      </View>
      {filteredEvents && filteredEvents.length >= 1
        ? (
          <View style={styles.listContainer}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} nestedScrollEnabled scrollEnabled>
              <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  delayValue += 500;
                  const translateX = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [delayValue, 1],
                  });
                  return <ComingUpCard translateX={translateX} event={item} isOccupied={isOccupied} />;
                }}
              />
            </ScrollView>
          </View>
        ) : (
          <Animated.View style={{ flex: 1, marginTop: 24, transform: [{ translateX: sencenteTranslateX }] }}>
            <Text style={styles.eventTime}>No events left for today.</Text>
          </Animated.View>
        )}
    </View>
  );
};

ComingUp.propTypes = {
  animatedValue: PropTypes.shape({
    interpolate: PropTypes.func,
  }).isRequired,
  delayValue: PropTypes.number.isRequired,
  events: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]),
  isOccupied: PropTypes.bool.isRequired,
  isParticipants: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
};

ComingUp.defaultProps = {
  events: null,
};

export default ComingUp;
