import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  inputStyle: {
    position: 'relative',
    height: 56,
    width: 360,
    borderRadius: 4,
    borderColor: '#a3a3ad',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 50,
  },
  inputHelpText: {
    color: '#20b9f5',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    paddingLeft: 4,
    left: 16,
    top: -8,
  },
  iconView: {
    position: 'absolute',
    width: 50,
    height: 50,
    zIndex: 10,
    top: 10,
    right: 0,
  },
});

const InputField = ({ focused, onChange, onFocus, onBlur, value, placeholder, inputName, secure, onSetView }) => (
  <View style={{ position: 'relative' }}>
    {focused && <Text style={styles.inputHelpText}>{inputName}</Text>}
    <View style={styles.iconView}>
      {inputName === 'Token'
        ? (
          <TouchableOpacity onPress={onSetView}>
            {
            secure
              ? <Icon name="visibility-off" size={32} />
              : <Icon name="visibility" size={32} />
          }
          </TouchableOpacity>
        )
        : null}
    </View>
    <TextInput
      style={{ ...styles.inputStyle, borderColor: focused ? '#20b9f5' : '#a3a3ad' }}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      placeholder={focused ? '' : placeholder}
      onChangeText={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      secureTextEntry={secure}
    />
  </View>
);

InputField.propTypes = {
  secure: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSetView: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  onSetView: () => { },
};


export default InputField;
