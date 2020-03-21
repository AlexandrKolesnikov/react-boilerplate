import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger');

  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middlewares.unshift(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares);

export function configureStore(initialState?: ReturnType<typeof rootReducer>) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      createStoreWithMiddleware,
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();
