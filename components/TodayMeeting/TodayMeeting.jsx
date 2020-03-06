import React from 'react';
import PropTypes from 'prop-types';
import ScheduleModal from '../ScheduleModal/ScheduleModal';

const TodayMeeting = ({ isOccupied, events, blurValue, animatedValue, viewRef }) => (!isOccupied && !events.length
  ? null
  : (
    <ScheduleModal
      blurValue={blurValue}
      animatedValue={animatedValue}
      viewRef={viewRef}
      attendees={events[0] ? events[0].attendees : []}
      comingUp={events || []}
      isOccupied={isOccupied}
    />
  ));

TodayMeeting.propTypes = {
  isOccupied: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    attendees: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,
  blurValue: PropTypes.shape({}).isRequired,
  animatedValue: PropTypes.shape({}).isRequired,
  viewRef: PropTypes.number,
};

TodayMeeting.defaultProps = {
  viewRef: null,
};

export default TodayMeeting;
