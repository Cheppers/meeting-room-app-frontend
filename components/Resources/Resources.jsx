import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, SafeAreaView, StyleSheet } from 'react-native';
import ResourceCard from './ResourceCard';
import ResourceHeader from './ResourceHeader';

const styles = StyleSheet.create({
  flexin: { flex: 1 },
  resourcesTitle: {
    marginTop: 82,
    marginBottom: 32,
    marginLeft: 56,
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '700',
    color: '#1E1E20',
  },
  resourceList: {
    maxHeight: 200,
    paddingLeft: 56,
  },
});

const Resources = ({ resources, headerLogo, onPress }) => (
  <SafeAreaView style={styles.flexin}>
    <View style={styles.flexin}>
      <ResourceHeader headerLogo={headerLogo} />
      <Text style={styles.resourcesTitle}>
        Select one of the resources
      </Text>
      <ScrollView
        style={styles.resourceList}
        contentContainerStyle={{ paddingRight: 200 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {resources
          && resources.map((resource) => (
            <ResourceCard
              key={resource.resource_id}
              resource={resource}
              onPress={onPress}
              resourceName={resource.beautifiedResourceName}
            />
          ))}
      </ScrollView>
    </View>
  </SafeAreaView>
);

Resources.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({})),
  headerLogo: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

Resources.defaultProps = {
  resources: null,
};

export default Resources;
