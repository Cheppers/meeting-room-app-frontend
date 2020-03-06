import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoomImages from '../../consts/RoomImages';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  resourcesView: {
    flexDirection: 'row',
    height: height * 0.25,
    width: width * 0.25,
    minWidth: 280,
    padding: 32,
    marginRight: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1e1e20',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    width: '100%',
    maxWidth: 160,
  },
});

const ResourceCard = ({ resourceName, resource, onPress }) => (
  <TouchableOpacity flex={{ width }} onPress={() => { onPress(resource); }}>
    <View style={styles.resourcesView}>
      <RoomImages style={{ paddingRight: 20 }} />
      <Text style={styles.text}>{resourceName}</Text>
    </View>
  </TouchableOpacity>
);

ResourceCard.propTypes = {
  resourceName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  resource: PropTypes.shape({}),
};

ResourceCard.defaultProps = {
  resource: null,
};

export default ResourceCard;
