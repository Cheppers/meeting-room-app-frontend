import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import * as NavigationService from '../../services/navigationService';

const styles = StyleSheet.create({
  resourceHeaderContainer: {
    padding: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 30,
    height: 42,
    resizeMode: 'contain',
  },
});

const ResourceHeader = ({ headerLogo }) => (
  <View style={styles.resourceHeaderContainer}>
    <FastImage source={{ uri: headerLogo }} style={styles.imageStyle} />
    <TouchableOpacity onPress={() => NavigationService.navigate('Configuration')}>
      <FontAwesomeIcon icon={faCog} size={24} color="white" />
    </TouchableOpacity>
  </View>
);

ResourceHeader.propTypes = {
  headerLogo: PropTypes.string.isRequired,
};

export default ResourceHeader;
