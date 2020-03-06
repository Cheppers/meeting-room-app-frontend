import React from 'react';
import { View } from 'react-native';
import Logo1 from '../assets/roomImages/community-room-icon.svg';
import Logo2 from '../assets/roomImages/csgop-room-icon.svg';
import Logo3 from '../assets/roomImages/dining-room-icon.svg';
import Logo4 from '../assets/roomImages/english-room-icon.svg';
import Logo5 from '../assets/roomImages/meeting-room-01-icon.svg';
import Logo6 from '../assets/roomImages/meeting-room-02-icon.svg';
import Logo7 from '../assets/roomImages/skype-room-icon.svg';

const logoArray = [
  <Logo1 />, <Logo2 />, <Logo3 />, <Logo4 />, <Logo5 />, <Logo6 />, <Logo7 />,
];

export default (props) => <View {...props}>{logoArray[Math.floor(Math.random() * logoArray.length)]}</View>;
