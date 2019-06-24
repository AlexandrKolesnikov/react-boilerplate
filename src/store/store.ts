import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appHistory from '../routing/history';
import rootSaga from './rootSaga';
import combinedReducers from './rootReducer';
import { IAppState } from "./types";

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

const createStoreWithMiddleware = applyMiddleware(...middlewares);

export function configureStore(initialState?: IAppState) {
    const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
        && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    // const store = createStoreWithMiddleware(
    //     combinedReducers,
    //     initialState,
    //     reduxDevTools,
    // );
    const store = createStore(
        combinedReducers,
        initialState,
        composeWithDevTools(
            createStoreWithMiddleware,
        ),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    (window as any).store = store;
}

export default store;
