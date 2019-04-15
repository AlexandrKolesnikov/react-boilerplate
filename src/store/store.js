import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import appHistory from '../routing/history';
import rootSaga from './rootSaga';
import combinedReducers from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const router = routerMiddleware(appHistory);
const middlewares = [sagaMiddleware, router];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middlewares.unshift(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export function configureStore(initialState) {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStoreWithMiddleware(
    combinedReducers,
    initialState,
    reduxDevTools,
  );

  sagaMiddleware.run(rootSaga, store);

  return store;
}

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
