import API from '../constants/axios';
import * as types from '../actions/types';

/** ACTIONS DISPATCH **/

// POST_GAME
export function setPostGame() {
    return {
        type: types.POST_GAME
    };
}

// GET_GAME
export function setGame(game) {
    return {
        type: types.GET_GAME,
        game
    };
}

// COUNSTRIES_BY_GROUP
export function setQuinielaByGroups(countriesByGroup) {
    return {
        type: types.COUNSTRIES_BY_GROUP,
        countriesByGroup
    };
}
/**
// 3
export function setQuinielasByUser(userQuinielas) {
    return {
        type: SET_CURRENT_USER,
        userQuinielas
    };
}
// 4
export function setQuinielasByUser(userQuinielas) {
    return {
        type: SET_CURRENT_USER,
        userQuinielas
    };
}

/** ACTIONS **/

// POST_GAME
export function postGame(gameBody) {
    return dispatch => {
        API.get(`user/${gameBody}/quinela`, {
            ...gameBody
        })
            .then(userQuinielas => {
                dispatch(setPostGame(userQuinielas));
            }).catch(e => {
                console.log('Error al traer "Quiniela": ' + e);
            });
    };
}
// 2
export function getGame(userId) {
    return dispatch => {
        API.get(`user/${userId}/quinela`)
            .then(game => {
                dispatch(setGame(game));
            }).catch(e => {
                console.log('Error "getGame": ' + e);
            });
    };
}
// COUNSTRIES_BY_GROUP
export function getGroupList() {
    return dispatch => {
        API.get('countries_groups/')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(e => {
                console.log('Error "getGroupList": ' + e);
            });
    };
}
/** // 4
export function getQuiniela(userId) {
    return dispatch => {
        API.get(`user/${userId}/quinela`)
            .then(userQuinielas => {
                console.log(userQuinielas);
                dispatch(setQuinielasByUser(userQuinielas));
            }).catch(e => {
            console.log('Error al traer "Quiniela": ' + e);
        });
    };
}*/
