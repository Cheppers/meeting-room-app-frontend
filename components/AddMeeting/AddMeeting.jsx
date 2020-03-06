import React from 'react';
import PropTypes from 'prop-types';
import AddMeetingModal from './AddMeetingModal';
import AddMeetingModalActionButton from './AddMeetingModalActionButton';

const AddMeeting = ({ adHocMeetingTimes, spinValue, reservingModalOpen, events, onScheduleEvent, onReservingModalOpen, touch }) => (
  <>
    <AddMeetingModal
      adHocMeetingTimes={adHocMeetingTimes}
      modalValue={spinValue}
      reservingModalOpen={reservingModalOpen}
      event={events.length > 0 ? events[0] : null}
      onScheduleEvent={onScheduleEvent}
    />
    <AddMeetingModalActionButton
      spinValue={spinValue}
      reservingModalOpen={reservingModalOpen}
      onModalOpen={() => {
        touch();
        if (!reservingModalOpen) {
          onReservingModalOpen();
        }
      }}
    />
  </>
);

AddMeeting.propTypes = {
  adHocMeetingTimes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  spinValue: PropTypes.shape({}).isRequired,
  reservingModalOpen: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  onScheduleEvent: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  onReservingModalOpen: PropTypes.func.isRequired,
};

AddMeeting.defaultProps = {
  events: null,
};

export default AddMeeting;
