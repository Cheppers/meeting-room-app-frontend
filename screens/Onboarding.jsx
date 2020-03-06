import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmMeeting } from '../actions/appActions';
import { RESERVED_COLOR } from '../consts/colors';
import * as NavigationService from '../services/navigationService';
import Progress from '../components/Progress/Progress';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resourceNamePosition: {
    position: 'absolute',
    top: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 50,
  },
  basicText: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 30,
  },
});

class OnboardingScreen extends React.Component {
  state = {
    minutes: '04',
    seconds: '59',
    then: moment().add({ minutes: 5 }),
  };

  interval = 0;

  componentDidMount() {
    this.interval = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    const { minutes, seconds, then } = this.state;
    if (minutes === '00' && seconds === '00') {
      clearInterval(this.interval);
      this.setState({ minutes: '00', seconds: '00' });
      NavigationService.navigate('Room');
    } else {
      const now = moment();
      const countdown = moment(then - now);
      this.setState({ minutes: countdown.format('mm'), seconds: countdown.format('ss') });
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { events, dispatchConfirmMeeting, selectedResource } = this.props;
    const { minutes, seconds } = this.state;
    return (
      <View style={{ ...styles.container, backgroundColor: RESERVED_COLOR }} onStartShouldSetResponder={() => { dispatchConfirmMeeting(); return false; }}>
        <StatusBar hidden />
        <SafeAreaView style={styles.container}>
          <View style={styles.resourceNamePosition}>
            <Text style={{ ...styles.basicText, fontSize: 40, fontWeight: 'bold' }}>{selectedResource.beautifiedResourceName}</Text>
            <Text style={styles.basicText}>Tap somewhere to do the onboarding for the following event:</Text>
            <Text style={{ ...styles.basicText, paddingBottom: 0 }}>{events[0].summary}</Text>
          </View>
          <Progress seconds={seconds} minutes={minutes} />
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  events: store.events.events,
  selectedResource: store.app.selectedResource,
});

const mapDispatchToProps = {
  dispatchConfirmMeeting: confirmMeeting,
};

OnboardingScreen.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    summary: PropTypes.string,
  })),
  selectedResource: PropTypes.shape({
    beautifiedResourceName: PropTypes.string,
  }),
  dispatchConfirmMeeting: PropTypes.func.isRequired,
};

OnboardingScreen.defaultProps = {
  events: null,
  selectedResource: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
