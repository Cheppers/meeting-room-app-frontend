import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RESERVED_COLOR, RESERVED_TEXT, AVAILABLE_COLOR, AVAILABLE_TEXT } from '../../consts/colors';
import HeaderTitle from './HeaderTitle';
import RemainingTime from '../RemainingTime/RemainingTime';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    height: '23%',
    width: '100%',
    top: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  nameTextContainer: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 56,
  },
  roomText: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 36,
    fontWeight: '300',
  },
  line: {
    marginRight: 12,
    marginLeft: 6,
    opacity: 0.7,
    width: 1,
    height: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: 30,
    height: 42,
    resizeMode: 'contain',
  },
  remainingTimeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 56,
  },
});

const Header = ({ onNavigateBack, navigation, onModalOpen, roomName, isOccupied, date, spinValue, event, isError, blurValue, backendUrl }) => {
  const accessibleTextColor = isOccupied ? RESERVED_TEXT : AVAILABLE_TEXT;
  const accessibleColor = isOccupied ? RESERVED_COLOR : AVAILABLE_COLOR;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });
  const logoSource = isOccupied ? `${backendUrl}/images/logo.png` : `${backendUrl}/images/logoBlack.png`;
  return (
    <View style={{ ...styles.headerContainer, backgroundColor: accessibleColor }}>
      <View style={styles.nameTextContainer}>
        <HeaderTitle onModalOpen={onModalOpen} isOccupied={isOccupied} spin={spin} event={event} date={date} isError={isError} />
        <View style={styles.logoContainer}>
          <FastImage source={{ uri: logoSource }} style={styles.logoStyle} />
        </View>
      </View>
      <View style={styles.remainingTimeContainer}>
        {
          (!isOccupied && !event) || isError
            ? <View />
            : (
              <RemainingTime
                isOccupied={isOccupied}
                blurValue={blurValue}
                event={event}
                textColor={accessibleTextColor}
              />
            )
        }
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => { onNavigateBack(); navigation.navigate('Home'); }}>
            <Text style={{ ...styles.roomText, color: accessibleTextColor }}>{roomName}</Text>
          </TouchableOpacity>
          <View style={{ ...styles.line, backgroundColor: accessibleTextColor }} />
          <View>
            <Text style={{ ...styles.dateText, color: accessibleTextColor }}>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

Header.propTypes = {
  isError: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  onNavigateBack: PropTypes.func,
  onModalOpen: PropTypes.func,
  roomName: PropTypes.string,
  isOccupied: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  event: PropTypes.shape({
    summary: PropTypes.string,
  }),
  spinValue: PropTypes.shape({
    interpolate: PropTypes.func,
  }),
  blurValue: PropTypes.shape({}).isRequired,
  backendUrl: PropTypes.string.isRequired,
};

Header.defaultProps = {
  event: null,
  isError: false,
  onNavigateBack: () => { },
  onModalOpen: () => { },
  navigation: {
    navigate: () => { },
  },
  spinValue: {
    interpolate: () => { },
  },
  roomName: null,
};

const mapStateToProps = (store) => ({
  backendUrl: store.token.backendUrl,
});

export default connect(mapStateToProps, null)(Header);
