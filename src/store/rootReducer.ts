import {combineReducers, Reducer} from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { AppActionTypes } from './constants';
import {IAppState} from "./types";

const combinedReducers = combineReducers({
  routerReducer,
  form: formReducer,
});

const rootReducer: Reducer<IAppState> = (state, action) => {
	if (action.type === AppActionTypes.APP_RESET_STATE) {
		// eslint-disable-next-line no-param-reassign
		state = undefined;
	}

	return combinedReducers(state, action);
};

export default rootReducer;
