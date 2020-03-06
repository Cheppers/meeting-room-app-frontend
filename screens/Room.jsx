import React from 'react';
import PropTypes from 'prop-types';
import { Animated, findNodeHandle, BackHandler } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import { connect } from 'react-redux';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import {
  reserveAdhocMeeting, showResources, touch,
  cancelMeeting, openBaseModal, closeBaseModal,
  cancelSwipe, startSwipe,
} from '../actions/appActions';
import Header from '../components/Header/Header';
import RoomContainer from '../components/RoomContainer/RoomContainer';
import TodayMeeting from '../components/TodayMeeting/TodayMeeting';
import MeetingModals from '../components/MeetingModals/MeetingModals';
import Loading from '../components/Loading/Loading';
import NextMeetings from '../components/NextMeetings/NextMeetings';


class RoomScreen extends React.Component {
  backgroundImage = null;

  interval = 0;

  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener('didFocus', () => BackHandler.addEventListener('hardwareBackPress', this.onBack));
    this.state = {
      modalOpen: false,
      reservingModalOpen: false,
      cancelModal: false,
      date: moment().format('HH:mm'),
      spinValue: new Animated.Value(0),
      modalArrow: new Animated.Value(0),
      blurValue: new Animated.Value(0),
      animatedValue: new Animated.Value(0),
      cancelValue: new Animated.Value(0),
      nextMeetingValue: new Animated.Value(0),
      viewRef: null,
    };
  }

  componentDidMount() {
    SystemSetting.setAppBrightness(1);
    const { navigation } = this.props;
    this.willBlur = navigation.addListener('willBlur', () => BackHandler.removeEventListener('hardwareBackPress', this.onBack));
    this.interval = setInterval(this.timer, 1000);
  }

  componentDidUpdate(nextProps) {
    const { events: thisEvent, baseModalOpen: thisModalOpen } = this.props;
    const { events: nextEvent, baseModalOpen: nextModalOpen } = nextProps;
    const { modalOpen } = this.state;
    if (thisEvent !== null && thisEvent.events !== null && nextEvent.events !== null) {
      if (thisEvent.events.length !== nextEvent.events.length && nextEvent.events.length === 0 && modalOpen) {
        this.onModalOpen();
      }
    }
    if (!thisModalOpen && !nextModalOpen && modalOpen) {
      this.onModalOpen();
    }
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
    clearInterval(this.interval);
  }

  onBack = () => {
    const { dispatchShowResources } = this.props;
    dispatchShowResources();
    return false;
  };

  timer = () => {
    this.setState({
      date: moment().format('HH:mm'),
    });
  }

  animateTiming = (state, toValue, duration) => {
    Animated.timing(state, { toValue, duration }).start();
  }

  animateSpring = (state, toValue, tension) => {
    Animated.timing(state, { tension, toValue, useNativeDriver: true }).start();
  }

  onModalOpen = () => {
    const { modalArrow, blurValue, nextMeetingValue, animatedValue, modalOpen: stateModalOpen } = this.state;
    const { dispatchBaseModalOpen, dispatchBaseModalClose } = this.props;
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
    this.setState(({ modalOpen }) => ({ viewRef: modalOpen ? findNodeHandle(this.backgroundImage) : null }));
    this.animateTiming(modalArrow, !stateModalOpen ? 1 : 0, 300);
    this.animateTiming(blurValue, !stateModalOpen ? 1 : 0, 300);
    this.animateSpring(animatedValue, !stateModalOpen ? 1 : 0, 200);
    this.animateSpring(nextMeetingValue, !stateModalOpen ? 1 : 0, 100);
    if (!stateModalOpen) {
      dispatchBaseModalOpen();
    } else {
      dispatchBaseModalClose();
    }
  }

  onReservingModalOpen = () => {
    this.setState({ reservingModalOpen: true });
    const { spinValue } = this.state;
    this.animateTiming(spinValue, 1, 500);
  }

  onReservingModalClose = () => {
    this.setState({ reservingModalOpen: false });
    const { spinValue } = this.state;
    this.animateTiming(spinValue, 0, 500);
  }

  onCancelModalOpen = () => {
    this.setState({ cancelModal: true });
    const { cancelValue } = this.state;
    this.animateTiming(cancelValue, 1, 500);
  }

  onCancelModalClose = () => {
    this.setState({ cancelModal: false });
    const { cancelValue } = this.state;
    this.animateTiming(cancelValue, 0, 500);
  }

  onScheduleEvent = (time) => {
    const { dispatchReserveAdhocMeeting, dispatchTouch } = this.props;
    const { modalOpen } = this.state;
    dispatchReserveAdhocMeeting(time);
    dispatchTouch();
    if (modalOpen) {
      this.onModalOpen();
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { date, spinValue, reservingModalOpen, modalArrow, viewRef, blurValue, nextMeetingValue, animatedValue, cancelValue, cancelModal } = this.state;
    const {
      navigation, selectedResource,
      adHocMeetingTimes, events: { events, isOccupied },
      loading, dispatchShowResources,
      dispatchTouch, dispatchCancelMeeting,
      baseModalOpen, dispatchCancelSwipe,
      dispatchStartSwipe, swipeBack,
    } = this.props;
    return events === null || loading
      ? <Loading />
      : (
        <RoomContainer
          imageRef={(img) => { this.backgroundImage = img; }}
          onReservingModalClose={this.onReservingModalClose}
          onCancelModalClose={this.onCancelModalClose}
          touch={() => { dispatchTouch(); }}
          reservingModalOpen={reservingModalOpen}
          cancelModal={cancelModal}
          modalOpen={baseModalOpen}
          isOccupied={isOccupied}
          events={events}
        >
          <MeetingModals
            isOccupied={isOccupied}
            adHocMeetingTimes={adHocMeetingTimes}
            events={events}
            spinValue={spinValue}
            cancelValue={cancelValue}
            modalOpen={baseModalOpen}
            cancelModal={cancelModal}
            reservingModalOpen={reservingModalOpen}
            onScheduleEvent={this.onScheduleEvent}
            onReservingModalOpen={this.onReservingModalOpen}
            onCancelEvent={this.onModalOpen}
            onCancelModalOpen={this.onCancelModalOpen}
            touch={() => { dispatchTouch(); }}
            cancelMeeting={() => { dispatchCancelMeeting(); }}
          />
          <Header
            onModalOpen={this.onModalOpen}
            onNavigateBack={() => { dispatchTouch(); dispatchShowResources(); }}
            navigation={navigation}
            roomName={selectedResource.beautifiedResourceName}
            isOccupied={isOccupied}
            date={date}
            spinValue={modalArrow}
            blurValue={blurValue}
            event={events.length > 0 ? events[0] : null}
          />
          <TodayMeeting
            isOccupied={isOccupied}
            events={events}
            blurValue={blurValue}
            animatedValue={animatedValue}
            viewRef={viewRef}
          />
          <NextMeetings
            viewRef={viewRef}
            events={events}
            isOccupied={isOccupied}
            modalOpen={baseModalOpen}
            nextMeetingValue={nextMeetingValue}
            cancelSwipe={dispatchCancelSwipe}
            startSwipe={dispatchStartSwipe}
            swipeBack={swipeBack}
          />
        </RoomContainer>
      );
  }
}

RoomScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    addListener: PropTypes.func,
  }).isRequired,
  selectedResource: PropTypes.shape({
    beautifiedResourceName: PropTypes.string,
  }),
  adHocMeetingTimes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  dispatchReserveAdhocMeeting: PropTypes.func.isRequired,
  dispatchShowResources: PropTypes.func.isRequired,
  dispatchTouch: PropTypes.func.isRequired,
  dispatchCancelMeeting: PropTypes.func.isRequired,
  dispatchBaseModalOpen: PropTypes.func.isRequired,
  dispatchCancelSwipe: PropTypes.func.isRequired,
  dispatchStartSwipe: PropTypes.func.isRequired,
  dispatchBaseModalClose: PropTypes.func.isRequired,
  events: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.shape({
      length: PropTypes.number,
    })),
    isOccupied: PropTypes.bool,
  }).isRequired,
  baseModalOpen: PropTypes.bool.isRequired,
  swipeBack: PropTypes.bool.isRequired,
};

RoomScreen.defaultProps = {
  selectedResource: null,
};

const mapStateToProps = (store) => ({
  selectedResource: store.app.selectedResource,
  adHocMeetingTimes: store.app.adHocMeetingTimes,
  baseModalOpen: store.app.baseModalOpen,
  swipeBack: store.app.swipeBack,
  events: store.events,
  loading: store.events.loading,
});

const mapDisptachToProps = {
  dispatchReserveAdhocMeeting: reserveAdhocMeeting,
  dispatchShowResources: showResources,
  dispatchTouch: touch,
  dispatchCancelMeeting: cancelMeeting,
  dispatchBaseModalOpen: openBaseModal,
  dispatchBaseModalClose: closeBaseModal,
  dispatchCancelSwipe: cancelSwipe,
  dispatchStartSwipe: startSwipe,
};

export default connect(mapStateToProps, mapDisptachToProps)(withNavigation(RoomScreen));
