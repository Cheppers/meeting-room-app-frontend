import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const RoomContainer = ({
  children, reservingModalOpen, onReservingModalClose, onCancelModalClose,
  cancelModal, touch, imageRef, modalOpen, isOccupied, events,
  backendUrl,
}) => {
  let roomImage;
  if (isOccupied) {
    if (events.length && events[0].summary === 'Ad hoc meeting') {
      roomImage = `${backendUrl}/images/adhocmeeting.png`;
    } else {
      roomImage = `${backendUrl}/images/reserved.png`;
    }
  } else {
    roomImage = `${backendUrl}/images/available.png`;
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      onStartShouldSetResponder={() => {
        touch();
        if (reservingModalOpen) {
          onReservingModalClose();
        }
        if (cancelModal) {
          onCancelModalClose();
        }
        return false;
      }}
    >
      <FastImage ref={imageRef} source={{ uri: roomImage }} style={styles.imageStyle} />
      <View style={{ ...styles.container, justifyContent: modalOpen ? 'flex-start' : 'space-between' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar hidden />
          {children}
        </SafeAreaView>
      </View>
    </View>
  );
};

RoomContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onReservingModalClose: PropTypes.func.isRequired,
  onCancelModalClose: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  imageRef: PropTypes.func.isRequired,
  reservingModalOpen: PropTypes.bool.isRequired,
  cancelModal: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  isOccupied: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    summary: PropTypes.string,
  })),
  backendUrl: PropTypes.string.isRequired,
};

RoomContainer.defaultProps = {
  events: [],
};

const mapStateToProps = (store) => ({
  backendUrl: store.token.backendUrl,
});

export default connect(mapStateToProps, null)(RoomContainer);
