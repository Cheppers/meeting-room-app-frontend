import { all } from 'redux-saga/effects';
import { appSagas } from './appSaga';
import { websocketSaga } from './websocketSaga';
import { brightnessSaga } from './brightnessSaga';
import { modalOpenSaga } from './modalOpenSaga';
import { swiperSaga } from './swiperSaga';

export default function* rootSaga(dispatch) {
  yield all([
    ...appSagas,
    websocketSaga(dispatch),
    brightnessSaga(),
    modalOpenSaga(),
    swiperSaga(),
  ]);
}
