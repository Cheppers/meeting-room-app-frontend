import { take, delay, race, fork, cancel, put } from 'redux-saga/effects';
import { BASE_MODAL_OPEN, CANCEL_MODAL_OPEN, MODAL_SYNC } from '../consts/actionTypes';


export function* modalSync() {
  yield take(MODAL_SYNC);
  try {
    while (true) {
      const { delayEvent } = yield race({
        touchEvent: take(CANCEL_MODAL_OPEN),
        delayEvent: delay(120000),
      });
      if (delayEvent) {
        yield put({ type: CANCEL_MODAL_OPEN });
      }
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
}

export function* main() {
  while (true) {
    yield take(BASE_MODAL_OPEN);
    const task = yield fork(modalSync);
    yield put({ type: MODAL_SYNC });
    yield take(CANCEL_MODAL_OPEN);
    yield cancel(task);
  }
}


export const modalOpenSaga = main;
