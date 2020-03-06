import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    overflow: 'hidden',
  },
  eventListContainer: {
    flexDirection: 'column',
    marginLeft: 32,
  },
  fullName: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  email: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
});

const ParticipantCard = ({ participant, fullName, translateX }) => (
  <Animated.View style={{ ...styles.cardContainer, transform: [{ translateX }] }}>
    <View style={{ ...styles.circle, backgroundColor: participant.photo === null ? '#615be1' : 'transparent' }}>
      {
        participant.photo === null
          ? <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 'bold' }}>{fullName}</Text>
          : <FastImage source={{ uri: participant.photo }} style={styles.imageStyle} />
      }
    </View>
    <View style={styles.eventListContainer}>
      <Text style={styles.fullName}>{participant.full_name}</Text>
      <Text style={styles.email}>{participant.email}</Text>
    </View>
  </Animated.View>
);

ParticipantCard.propTypes = {
  participant: PropTypes.shape({
    photo: PropTypes.string,
    full_name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  translateX: PropTypes.shape({}).isRequired,
};

export default ParticipantCard;
