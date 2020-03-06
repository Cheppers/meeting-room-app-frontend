import React from 'react';
import moment from 'moment';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

class RemainingTime extends React.Component {
  state = {
    hoursDifference: null,
    minutesDifference: null,
  };

  interval = 0;

  componentDidMount() {
    this.interval = setInterval(this.setTimeDifference, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  absoluteMinutes = (time) => Math.abs(moment(time).diff(moment(), 'minutes'));

  absoluteHours = (time) => Math.abs(moment(time).diff(moment(), 'hours'));

  minutesDifference = (time) => (this.absoluteMinutes(time) > 60 ? this.absoluteMinutes(time) % 60 : this.absoluteMinutes(time));

  hoursDifference = (time) => (this.absoluteMinutes(time) > 60 ? this.absoluteHours(time) : null);

  getMinutesDifference = () => {
    const { isOccupied, event: { end, start } } = this.props;
    return isOccupied
      ? this.minutesDifference(end)
      : this.minutesDifference(start);
  }

  getHoursDifference = () => {
    const { isOccupied, event: { end, start } } = this.props;
    return isOccupied
      ? this.hoursDifference(end)
      : this.hoursDifference(start);
  }

  setTimeDifference = () => {
    this.setState({
      minutesDifference: this.getMinutesDifference(),
      hoursDifference: this.getHoursDifference(),
    });
  }

  render() {
    const { isOccupied, textColor } = this.props;
    const { minutesDifference, hoursDifference } = this.state;
    const reservingText = isOccupied ? 'RESERVED FOR' : 'FOR';
    const remainingTime = hoursDifference === null
      ? (+minutesDifference === 0 ? '<1 min' : `${minutesDifference} mins`)
      : `${hoursDifference} hours ${minutesDifference} mins`;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 14, color: textColor, marginRight: 12, fontWeight: '700', letterSpacing: 0.5, marginTop: 16 }}>{reservingText}</Text>
        <Text style={{ fontSize: 44, color: textColor, fontWeight: '700', letterSpacing: 1.1 }}>{remainingTime}</Text>
      </View>
    );
  }
}

RemainingTime.propTypes = {
  isOccupied: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
  }),
  textColor: PropTypes.string.isRequired,
};

RemainingTime.defaultProps = {
  event: null,
};

export default RemainingTime;
