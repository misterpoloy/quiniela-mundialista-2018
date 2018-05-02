import * as types from './types';

export function changeMainColor(color) {
    return {
        type: types.CHANGE_HEADER,
        payload: {
            color: color
        }
    };
}
