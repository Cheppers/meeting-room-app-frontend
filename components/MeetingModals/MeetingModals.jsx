import React from 'react';
import PropTypes from 'prop-types';
import AddMeeting from '../AddMeeting/AddMeeting';
import CancelMeeting from '../CancelMeeting/CancelMeeting';

const MeetingModals = ({
  isOccupied, adHocMeetingTimes, spinValue, events,
  reservingModalOpen, onScheduleEvent, onReservingModalOpen,
  touch, cancelModal, cancelValue, modalOpen, cancelMeeting,
  onCancelEvent, onCancelModalOpen,
}) => (!isOccupied
  ? (
    <AddMeeting
      adHocMeetingTimes={adHocMeetingTimes}
      spinValue={spinValue}
      events={events}
      reservingModalOpen={reservingModalOpen}
      onScheduleEvent={onScheduleEvent}
      touch={touch}
      onReservingModalOpen={onReservingModalOpen}
    />
  )
  : (
    <CancelMeeting
      cancelModal={cancelModal}
      cancelValue={cancelValue}
      modalOpen={modalOpen}
      touch={touch}
      cancelMeeting={cancelMeeting}
      onCancelEvent={onCancelEvent}
      onCancelModalOpen={onCancelModalOpen}
    />
  ));

MeetingModals.propTypes = {
  isOccupied: PropTypes.bool.isRequired,
  cancelModal: PropTypes.bool.isRequired,
  reservingModalOpen: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  cancelValue: PropTypes.shape({}).isRequired,
  spinValue: PropTypes.shape({}).isRequired,
  adHocMeetingTimes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onScheduleEvent: PropTypes.func.isRequired,
  onReservingModalOpen: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  cancelMeeting: PropTypes.func.isRequired,
  onCancelEvent: PropTypes.func.isRequired,
  onCancelModalOpen: PropTypes.func.isRequired,
};

export default MeetingModals;
