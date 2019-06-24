import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';

export interface IAppState {
  routerReducer: RouterState;
  form: FormStateMap;
}
