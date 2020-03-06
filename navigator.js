import { createStackNavigator, createAppContainer } from 'react-navigation';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home';
import RoomScreen from './screens/Room';
import ErrorScreen from './screens/Error';
import ConfigurationScreen from './screens/Configuration';

const AppNavigator = createStackNavigator({
  Configuration: {
    screen: ConfigurationScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Room: {
    screen: RoomScreen,
  },
  Error: {
    screen: ErrorScreen,
  },
  Onboarding: {
    screen: OnboardingScreen,
  },
});

export default createAppContainer(AppNavigator);
