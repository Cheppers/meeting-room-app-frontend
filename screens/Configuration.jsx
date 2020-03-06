import React from 'react';
import { View, Text, StatusBar, StyleSheet, SafeAreaView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputField from '../components/InputField/InputField';
import { changeInputField, saveConfiguration } from '../actions/appActions';

const ConfigurationScreenImage = require('../assets/images/configurationScreen.jpg');

const styles = StyleSheet.create({
  configurationScreen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  detailsContainer: {
    flex: 0.43,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 36,
  },
  configTitle: {
    color: '#04022e',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  subTitle: {
    color: '#04022e',
    fontSize: 16,
    opacity: 0.8,
    paddingBottom: 30,
  },
  linearGradient: {
    width: 360,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 32,
    shadowColor: 'rgba(32, 185, 245, 0.48)',
  },
  textColor: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

class ConfigurationScreen extends React.Component {
  state = {
    urlFocused: false,
    tokenFocused: false,
    tokenSecured: true,
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const { urlFocused, tokenFocused, tokenSecured } = this.state;
    const { dispatchChangeInputField, token, backendUrl, dispatchSaveConfiguration } = this.props;
    return (
      <View style={styles.configurationScreen}>
        <StatusBar hidden />
        <SafeAreaView style={styles.configurationScreen}>
          <Image source={ConfigurationScreenImage} style={styles.imageStyle} />
          <View style={styles.detailsContainer}>
            <Text style={styles.configTitle}>Configurate your system</Text>
            <Text style={styles.subTitle}>Please enter your Backend URL and token.</Text>
            <InputField
              focused={urlFocused}
              onChange={(text) => { dispatchChangeInputField('backendUrl', text); }}
              onFocus={() => { this.setState({ urlFocused: true }); }}
              onBlur={() => { if (!backendUrl) this.setState({ urlFocused: false }); }}
              value={backendUrl}
              secure={false}
              placeholder="URL"
              inputName="Backend URL"
            />
            <InputField
              focused={tokenFocused}
              onChange={(text) => { dispatchChangeInputField('token', text); }}
              onFocus={() => { this.setState({ tokenFocused: true }); }}
              onBlur={() => { if (!token) this.setState({ tokenFocused: false }); }}
              value={token}
              onSetView={() => { this.setState((prevState) => ({ tokenSecured: !prevState.tokenSecured })); }}
              secure={tokenSecured}
              placeholder="Token"
              inputName="Token"
            />
            <TouchableOpacity
              disabled={token === '' || backendUrl === ''}
              onPress={() => { dispatchSaveConfiguration(backendUrl, token); }}
            >
              <LinearGradient
                colors={['#43ddfb', '#20b9f5']}
                style={styles.linearGradient}
                start={{ x: 0.0, y: -0.5 }}
                end={{ x: 1, y: -0.5 }}
                locations={[0, 0.75]}
              >
                <Text style={styles.textColor}>CONFIGURATE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

ConfigurationScreen.propTypes = {
  token: PropTypes.string.isRequired,
  backendUrl: PropTypes.string.isRequired,
  dispatchChangeInputField: PropTypes.func.isRequired,
  dispatchSaveConfiguration: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  token: store.token.token,
  backendUrl: store.token.backendUrl,
});

const mapDispatchToProps = {
  dispatchChangeInputField: changeInputField,
  dispatchSaveConfiguration: saveConfiguration,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationScreen);
