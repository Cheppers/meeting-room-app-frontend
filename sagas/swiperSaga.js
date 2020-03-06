import { take, delay, race, put, fork, cancel } from 'redux-saga/effects';
import { CANCEL_SWIPE_TIMER, SWIPE_BACK, START_SWIPE_TIMER, SWIPE_SYNC } from '../consts/actionTypes';

export function* swiperSync() {
  yield take(SWIPE_SYNC);
  while (true) {
    const { delayEvent } = yield race({
      cancelSwipeEvent: take(CANCEL_SWIPE_TIMER),
      swipeEvent: take(START_SWIPE_TIMER),
      delayEvent: delay(10000),
    });
    if (delayEvent) {
      yield put({ type: SWIPE_BACK });
    }
  }
}

export function* main() {
  while (true) {
    yield take(START_SWIPE_TIMER);
    const task = yield fork(swiperSync);
    yield put({ type: SWIPE_SYNC });
    yield take(CANCEL_SWIPE_TIMER);
    yield cancel(task);
  }
}

export const swiperSaga = main;
