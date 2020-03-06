import React from 'react';
import PropTypes from 'prop-types';
import CancelMeetingActionButton from './CancelMeetingActionButton';
import CancelMeetingModal from './CancelMeetingModal';

const CancelMeeting = ({ cancelModal, cancelValue, touch, modalOpen, cancelMeeting, onCancelEvent, onCancelModalOpen }) => (
  <>
    <CancelMeetingModal
      cancelModal={cancelModal}
      cancelValue={cancelValue}
      onCancelEvent={() => { cancelMeeting(); touch(); if (modalOpen) { onCancelEvent(); } }}
    />
    <CancelMeetingActionButton
      cancelModal={cancelModal}
      cancelValue={cancelValue}
      onModalOpen={() => { touch(); if (!cancelModal) { onCancelModalOpen(); } }}
    />
  </>
);

CancelMeeting.propTypes = {
  cancelModal: PropTypes.bool.isRequired,
  cancelValue: PropTypes.shape({}).isRequired,
  modalOpen: PropTypes.bool.isRequired,
  touch: PropTypes.func.isRequired,
  cancelMeeting: PropTypes.func.isRequired,
  onCancelEvent: PropTypes.func.isRequired,
  onCancelModalOpen: PropTypes.func.isRequired,
};

export default CancelMeeting;
