import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { AppActionTypes } from './constants';

const combinedReducers = combineReducers({
  routerReducer,
  form: formReducer,
});

export default (state, action) => {
  if (action.type === AppActionTypes.APP_RESET_STATE) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return combinedReducers(state, action);
};
