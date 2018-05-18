import API from '../constants/axios';
import * as types from '../actions/types';

/** ACTIONS DISPATCH **/

// POST_PREDICTIONS
export function predictionSuccess(predictionsByUsers) {
    return {
        type: types.GET_PREDICTIONS,
        predictionsByUsers
    };
}
// GET_QUINIELA_POSITIONS
export function setPositions(quinielaPositions) {
    return {
        type: types.GET_QUINIELA_POSITIONS,
        quinielaPositions
    };
}
export function postSuccesfull() {
    return {
        type: types.POST_PREDICTIONS,
        postSuccesfull: true
    };
}

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

// GET_GAMES_BY_STRUCTURE
export function setGamesByStructure() {
    return {
        type: types.GET_GAMES_BY_STRUCTURE
    };
}
// GET_GAMES_BY_STRUCTURE
export function setGrupos(grupos) {
    return {
        type: types.SET_GAME_GRUPOS,
        grupos
    };
}
export function setOctavos(octavos) {
    return {
        type: types.SET_GAME_OCTAVOS,
        octavos
    };
}
export function setCuartos(cuartos) {
    return {
        type: types.SET_GAME_CUARTOS,
        cuartos
    };
}
export function setSemiFinales(semiFinales) {
    return {
        type: types.SET_GAME_SEMIFINALES,
        semiFinales
    };
}
export function setTercerPuesto(tercer) {
    return {
        type: types.SET_GAME_TERCEROS,
        tercer
    };
}
export function setFinal(final) {
    return {
        type: types.SET_GAME_FINAL,
        final
    };
}
/** ACTIONS **/
// GET_PREDICTIONS_BY_USER
export function getPredictionsPerUser(QuinielaId, userId) {
    return dispatch => {
        API.get(`quinela_prediction/quiniela/${QuinielaId}/user/${userId}`)
            .then(prediction => {
                dispatch(predictionSuccess(prediction.data));
            }).catch(() => {
                // console.log('Error "getGame": ' + e);
            });
    };
}
// POST_PREDICTIONS
export function sendPrediction(games) {
    return dispatch => {
        API.post('quinela_prediction', {
            games
        })
        .then(() => {
            dispatch(postSuccesfull());
        }).catch(() => {
            // console.log('Error sendPrediction": ' + e);
        });
    };
}
// GET_QUINIELA_POSITIONS
export function getQuinielaPositions(quinielaId) {
    return dispatch => {
        API.get(`quinela/${quinielaId}/stats`)
            .then(positions => {
                dispatch(setPositions(positions.data));
            }).catch(() => {
                // console.log('Error "getQuinielaPositions": ' + e);
            });
    };
}
// GET_GAMES_BY_STRUCTURE
export function gamesByStructure(gameBody) {
    return dispatch => {
        API.get(`user/${gameBody}/quinela`, {
            ...gameBody
        })
            .then(userQuinielas => {
                dispatch(setPostGame(userQuinielas));
            }).catch(() => {
                // console.log('Error al traer "Quiniela": ' + e);
            });
    };
}
// 2
export function getGame(userId) {
    return dispatch => {
        API.get(`user/${userId}/quinela`)
            .then(game => {
                dispatch(setGame(game));
            }).catch(() => {
                // console.log('Error "getGame": ' + e);
            });
    };
}
// COUNSTRIES_BY_GROUP
export function getGroupList() {
    return dispatch => {
        API.get('countries_groups')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(() => {
                // console.log('Error "getGroupList": ' + e);
            });
    };
}
// SET_INVITATIONS
export function getAllGamesByGroups() {
    // console.log('dispatch');
    return dispatch => {
        API.get('game/estructura/1') // grupos
            .then(grupos => {
                dispatch(setGrupos(grupos.data));
                API.get('game/estructura/2') // octavos
                    .then(octavos => {
                        dispatch(setOctavos(octavos.data));
                        API.get('game/estructura/3') // cuartos
                            .then(cuartos => {
                                dispatch(setCuartos(cuartos.data));
                                API.get('game/estructura/4') // semifinales
                                    .then(semifinales => {
                                        dispatch(setSemiFinales(semifinales.data));
                                        API.get('game/estructura/5') // tercer puesto
                                            .then(tercer => {
                                                dispatch(setTercerPuesto(tercer.data));
                                                API.get('game/estructura/6') // final
                                                    .then(final => {
                                                        dispatch(setFinal(final.data));
                                                    }).catch(() => {
                                                        // console.log('Error "getAllGamesByGroups 6": ' + e);
                                                    });
                                            }).catch(() => {
                                                // console.log('Error "getAllGamesByGroups 5": ' + e);
                                            });
                                    }).catch(() => {
                                        // console.log('Error "getAllGamesByGroups 4": ' + e);
                                    });
                            }).catch(() => {
                                // console.log('Error "getAllGamesByGroups 3": ' + e);
                            });
                    }).catch(() => {
                        // console.log('Error "getAllGamesByGroups asdasd 2": ' + e);
                    });
            }).catch(() => {
                // console.log('Error "getAllGamesByGroups 1": ' + e);
            });
    };
}
