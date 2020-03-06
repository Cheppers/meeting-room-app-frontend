import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, findNodeHandle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Swiper from 'react-native-swiper';
import ComingUpCard from '../ComingUp/ComingUpCard';


const styles = StyleSheet.create({
  container: {
    width: '36%',
    height: '32%',
    bottom: 56,
    left: 56,
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 16,
  },
  wrappedContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 16,
    zIndex: 100,
  },
  blurStyle: {
    shadowRadius: 48,
    shadowColor: 'rgba(4, 2, 46, 0.56)',
    shadowOpacity: 0.56,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(97, 91, 225, 0.56)',
    backgroundColor: 'rgba(50, 0, 185, 0.24)',
  },
  comingUpText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    paddingLeft: 36,
    paddingTop: 36,
  },
  wrapper: {},
  slide: {
    flex: 1,
    paddingLeft: 36,
    marginTop: -20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dotsContainer: {
    bottom: 34,
    left: 28,
    right: 0,
    flexDirection: 'row',
  },
  dotStyle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    marginLeft: 12,
    marginRight: 12,
  },
});

class NextMeetings extends React.Component {
  swiper = null;

  blurredRef = null;

  timer = null;

  state = {
    index: 0,
    blurredRef: null,
  };

  componentDidMount() {
    this.setState({ blurredRef: findNodeHandle(this.blurredRef) });
  }

  componentDidUpdate(prevProps, prevState) {
    const { cancelSwipe, swipeBack, modalOpen, events } = this.props;
    const { index } = this.state;
    const { modalOpen: prevModalOpen, events: prevEvents } = prevProps;
    const { index: prevIndex } = prevState;
    if (prevModalOpen !== modalOpen || events.length !== prevEvents.length) {
      this.setState({ blurredRef: findNodeHandle(this.blurredRef) }); // eslint-disable-line
    }
    if (this.swiper && index === 0 && prevIndex !== index) {
      cancelSwipe();
    }
    if (this.swiper && swipeBack && index > 0) {
      this.swiper.scrollBy(index * -1, true);
    }
  }

  startSwiping = (e, state) => {
    const { startSwipe } = this.props;
    const { index } = this.state;
    if (state.index !== index && state.index !== 0) {
      startSwipe();
    }
    this.setState({ index: state.index });
  }

  renderPagination = (index, slicedEvents, isOccupied) => (
    <View style={styles.dotsContainer}>
      {slicedEvents.map((e, i) => (
        <View key={e.id} style={{ ...styles.dotStyle, backgroundColor: isOccupied ? '#BF1756' : '#1BFCBE', opacity: index !== i ? 0.5 : 1 }} />
      ))}
    </View>
  )

  render() {
    const { events, isOccupied, nextMeetingValue, modalOpen } = this.props;
    const { index, blurredRef } = this.state;
    if (!events || !events.length || events === null || (events.length === 1 && isOccupied)) {
      return null;
    }
    const slicedEvents = isOccupied ? events.slice(1, 4) : events.slice(0, 3);
    const modalOpacity = nextMeetingValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return !modalOpen ? (
      <Animated.View style={{ ...styles.container, opacity: modalOpacity }}>
        <View style={styles.wrappedContainer}>
          <Text style={styles.comingUpText}>Coming up:</Text>
          <Swiper
            ref={(ref) => { this.swiper = ref; }}
            key={slicedEvents.length}
            bounces
            loop={false}
            index={index}
            style={styles.wrapper}
            renderPagination={(paginatorIndex) => this.renderPagination(paginatorIndex, slicedEvents, isOccupied)}
            onMomentumScrollEnd={this.startSwiping}
            onIndexChanged={(changedIndex) => { this.setState({ index: changedIndex }); }}
          >
            {
              slicedEvents.map((event, i) => (
                <View style={styles.slide} key={i.toString()}>
                  <ComingUpCard event={event} isOccupied={isOccupied} />
                </View>
              ))
            }
          </Swiper>
        </View>
        <View ref={(component) => { this.blurredRef = component; }} style={styles.container} />
        <BlurView
          style={styles.container}
          viewRef={blurredRef}
          blurType="dark"
          blurAmount={1}
        />
      </Animated.View>
    ) : null;
  }
}

NextMeetings.propTypes = {
  cancelSwipe: PropTypes.func.isRequired,
  startSwipe: PropTypes.func.isRequired,
  swipeBack: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  isOccupied: PropTypes.bool.isRequired,
  nextMeetingValue: PropTypes.shape({
    interpolate: PropTypes.func,
  }).isRequired,
};

NextMeetings.defaultProps = {
  events: null,
};

export default NextMeetings;
