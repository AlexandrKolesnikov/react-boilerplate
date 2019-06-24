import { AppActionTypes } from './constants';

export function appResetState() {
    return {
        type: AppActionTypes.APP_RESET_STATE,
    };
}
