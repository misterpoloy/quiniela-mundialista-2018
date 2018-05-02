import * as types from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    game: {},
    predictionsByUsers: {},
    countriesByGroup: {},
    userPrediction: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.POST_GAME: // action done
            return state;
        case types.GET_GAME: // 2
            return {
                ...state,
                game: !isEmpty(action.game)
            };
        case types.COUNSTRIES_BY_GROUP: // action done
            return {
                ...state,
                countriesByGroup: action.countriesByGroup
            };
        case types.GET_USER_PREDICTIONS: // 4
            return {
                ...state,
                userPrediction: !isEmpty(action.userPrediction)
            };
        default:
            return state;
    }
};

