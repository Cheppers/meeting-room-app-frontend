import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MODAL_TEXT } from '../../consts/colors';

const styles = StyleSheet.create({
  reserveListItemText: {
    fontSize: 24,
    color: MODAL_TEXT,
    opacity: 0.7,
  },
  modalContainer: {
    marginLeft: 48,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 0,
  },
});

const AdHocMeetingTime = ({ adHocMeetingTimes, event, onScheduleEvent, reservingModalOpen }) => {
  let validAdHocMeetingTimes = adHocMeetingTimes;
  if (event !== null) {
    const remainingTime = moment(event.start).diff(moment(), 'minutes');
    validAdHocMeetingTimes = adHocMeetingTimes.filter((meetingTime) => meetingTime.value < remainingTime);
    const remainingTimeObject = {
      display: `${remainingTime} minutes`,
      value: remainingTime,
    };
    if (!validAdHocMeetingTimes.length) {
      validAdHocMeetingTimes = [{ ...remainingTimeObject }];
    } else if (validAdHocMeetingTimes.length === 1) {
      validAdHocMeetingTimes = [{ display: '15 minutes', value: 15 }, { ...remainingTimeObject }];
    }
  }

  return (
    <View style={styles.modalContainer}>
      {
        validAdHocMeetingTimes.map((meetingTime) => (
          <TouchableOpacity
            key={meetingTime.value}
            onPress={() => { onScheduleEvent(meetingTime.value); }}
            style={{ marginBottom: 24 }}
            disabled={reservingModalOpen}
          >
            <Text style={styles.reserveListItemText}>{meetingTime.display}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};

AdHocMeetingTime.propTypes = {
  adHocMeetingTimes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  event: PropTypes.shape({
    start: PropTypes.string,
  }),
  onScheduleEvent: PropTypes.func.isRequired,
  reservingModalOpen: PropTypes.bool.isRequired,
};

AdHocMeetingTime.defaultProps = {
  event: null,
};

export default AdHocMeetingTime;
