import React from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ParticipantCard from './ParticipantCard';

const styles = StyleSheet.create({
  participantsText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  listContainer: {
    height: '80%',
    marginTop: 24,
    justifyContent: 'center',
  },
});

const Participants = ({ participants, delayValue, animatedValue, isParticipants }) => (isParticipants
  ? (
    <View style={{ flex: 1, justifyContent: 'flex-start', paddingLeft: 56, paddingTop: 60 }}>
      <View>
        <Text style={styles.participantsText}>Participants:</Text>
      </View>
      <View style={styles.listContainer}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} nestedScrollEnabled scrollEnabled>
          <FlatList
            data={participants}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => {
              delayValue += 500;
              const translateX = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [delayValue, 1],
              });
              const getName = (name) => name.split(' ').map((splittedName) => splittedName.charAt(0).toUpperCase()).join(' ');
              return <ParticipantCard participant={item} translateX={translateX} fullName={getName(item.full_name)} />;
            }}
          />
        </ScrollView>
      </View>
    </View>
  )
  : null);

Participants.propTypes = {
  animatedValue: PropTypes.shape({
    interpolate: PropTypes.func,
  }).isRequired,
  delayValue: PropTypes.number.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({})),
  isParticipants: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
};

Participants.defaultProps = {
  participants: null,
};

export default Participants;
