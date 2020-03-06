import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

// PROD
function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
  ));
  sagaMiddleware.run(rootSaga, store.dispatch);

  return store;
}

// DEV
function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    reduxImmutableStateInvariant(),
    sagaMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  ));

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextReducer = require('../reducers/rootReducer').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga, store.dispatch);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

const store = configureStore();
export default store;
