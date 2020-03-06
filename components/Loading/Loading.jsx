import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a2777' }}>
    <ActivityIndicator color="white" size="large" />
  </View>
);

export default Loading;
