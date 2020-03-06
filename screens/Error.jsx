import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import moment from 'moment';
import SystemSetting from 'react-native-system-setting';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import { touch } from '../actions/appActions';

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

class ErrorScreen extends React.Component {
  interval = 0;

  state = {
    date: moment().format('HH:mm'),
  };

  componentDidMount() {
    SystemSetting.setAppBrightness(1);
    this.interval = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    this.setState({ date: moment().format('HH:mm') });
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { date } = this.state;
    const { selectedResource, backendUrl, dispatchTouch } = this.props;
    const roomName = selectedResource ? selectedResource.beautifiedResourceName : null;
    return (
      <View style={styles.imageContainer} onStartShouldSetResponder={() => { dispatchTouch(); return false; }}>
        <FastImage source={{ uri: `${backendUrl}/images/error.png` }} style={styles.imageStyle} />
        <Header roomName={roomName} isOccupied isError date={date} />
      </View>
    );
  }
}

ErrorScreen.propTypes = {
  selectedResource: PropTypes.shape({
    beautifiedResourceName: PropTypes.string,
  }),
  dispatchTouch: PropTypes.func.isRequired,
  backendUrl: PropTypes.string.isRequired,
};

ErrorScreen.defaultProps = {
  selectedResource: null,
};

const mapStateToProps = (store) => ({
  selectedResource: store.app.selectedResource,
  backendUrl: store.token.backendUrl,
});

const mapDispatchToProps = {
  dispatchTouch: touch,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorScreen);
