import * as types from '../actions/types';
import AppTheme from './../styles/app-material-ui-theme'; // Custom App Theme

const initialState = {
    primary1Color: AppTheme.palette.primary1Color, // MainColor
};

const theme = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_HEADER:
            state.primary1Color = action.payload.color;
            return state;
        default:
            return state;
    }
};

export default theme;
