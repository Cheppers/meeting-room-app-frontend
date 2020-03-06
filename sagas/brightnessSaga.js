import { take, delay, race } from 'redux-saga/effects';
import SystemSetting from 'react-native-system-setting';
import { TOUCH_EVENT, STORE_EVENTS } from '../consts/actionTypes';


export function* main() {
  while (true) {
    const { delayEvent } = yield race({
      touchEvent: take(TOUCH_EVENT),
      storeEvent: take(STORE_EVENTS),
      delayEvent: delay(60000),
    });
    if (delayEvent) {
      SystemSetting.setAppBrightness(0.25);
    } else {
      SystemSetting.setAppBrightness(1);
    }
  }
}


export const brightnessSaga = main;
