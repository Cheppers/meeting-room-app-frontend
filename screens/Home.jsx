import React from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { getResources, selectResource, touch } from '../actions/appActions';
import Resources from '../components/Resources/Resources';
import logos from '../consts/Logos';


const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class HomeScreen extends React.Component {
  componentDidMount() {
    const { dispatchGetResources } = this.props;
    SystemSetting.setAppBrightness(1);
    dispatchGetResources();
  }

  onPress = (resource) => {
    const { dispatchSelectResource, navigation } = this.props;
    dispatchSelectResource(resource);
    navigation.navigate('Room');
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { resources, resourcesLoading, backendUrl, dispatchTouch } = this.props;
    const isLoading = resourcesLoading && (!resources || !resources.length);
    return (
      <View style={styles.homeScreen} onMoveShouldSetResponder={() => { dispatchTouch(); return false; }}>
        <FastImage source={logos.resourcesScreen} style={styles.imageStyle} />
        <View style={styles.container}>
          <StatusBar hidden />
          {
            isLoading
              ? <ActivityIndicator size="large" color="#FFFFFF" />
              : <Resources resources={resources} headerLogo={`${backendUrl}/images/logo.png`} onPress={this.onPress} />
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  resources: store.app.resources,
  resourcesLoading: store.app.resourcesLoading,
  backendUrl: store.token.backendUrl,
});

const mapDispatchToProps = {
  dispatchGetResources: getResources,
  dispatchSelectResource: selectResource,
  dispatchTouch: touch,
};

HomeScreen.propTypes = {
  dispatchTouch: PropTypes.func.isRequired,
  dispatchGetResources: PropTypes.func.isRequired,
  dispatchSelectResource: PropTypes.func.isRequired,
  resourcesLoading: PropTypes.bool.isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({})),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  backendUrl: PropTypes.string.isRequired,
};

HomeScreen.defaultProps = {
  resources: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
