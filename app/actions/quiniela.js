import API from '../constants/axios';
import * as types from '../actions/types';

const apiPrefix = 'quiniela';

/** ACTIONS DISPATCH **/

// POST_QUINIELA
export function setQuinielaCreated(recentQuiniela) {
    return {
        type: types.POST_QUINIELA,
        recentQuiniela
    };
}
// GET_QUINIELA
export function setQuiniela(Quiniela) {
    return {
        type: types.GET_QUINIELA,
        Quiniela
    };
}
// GET_QUINIELA_ERROR
export function setQuinielaError() {
    return {
        type: types.GET_QUINIELA_ERROR,
        error: true
    };
}
// DELETE_QUINIELA
export function deleteQuinielaDispatch() {
    return {
        type: types.DELETE_QUINIELA
    };
}
// GET_MY_QUINIELAS
export function setQuinielasByUser(UserQuinielas) {
    return {
        type: types.GET_MY_QUINIELAS,
        UserQuinielas
    };
}
// GET_ALL_QUINIELAS
export function setAllQuinielas(AllQuinielas) {
    return {
        type: types.GET_MY_QUINIELAS,
        AllQuinielas
    };
}
// GET_INVITATION_QUINIELAS
export function setQuinielasInvitations(UserInvitations) {
    return {
        type: types.GET_INVITATION_QUINIELAS,
        UserInvitations
    };
}
// GET_SUPER_EXIST
export function setSuperQuiniela(superQuiniela) {
    return {
        type: types.GET_SUPER_EXIST,
        superQuiniela
    };
}
// GET_QUINIELA_USERS
export function setQuinielaPositionsUsers(usersByQuiniela) {
    return {
        type: types.GET_QUINIELA_USERS,
        usersByQuiniela
    };
}
// POST_INVITE_QUINIELA_USER
export function setUserInvited() {
    return {
        type: types.POST_INVITE_QUINIELA_USER
    };
}
// QUINIELAS_BY_TYPE
export function setQuinielasByType(quinielasByType) {
    return {
        type: types.QUINIELAS_BY_TYPE,
        quinielasByType
    };
}
// GET_INVITATIONS_BY_STATE
export function setInvitationsByState(invitationsByState) {
    return {
        type: types.GET_INVITATIONS_BY_STATE,
        invitationsByState
    };
}

/** ACTIONS **/

// GET_QUINIELA
export function getQuiniela(quinielaId) {
    return dispatch => {
        API.get(`quinela/${quinielaId}/`)
            .then(Quiniela => {
                console.log(Quiniela);
                dispatch(setQuiniela(Quiniela.data));
            }).catch(e => {
                console.log('Error "getQuiniela": ' + e);
                dispatch(setQuinielaError());
            });
    };
}
// POST_QUINIELA
export function createQuiniela(QuinielaBody) {
    return dispatch => {
        API.post('quinela/', {
            ...QuinielaBody
        })
            .then(userQuinielas => {
                console.log(userQuinielas);
                dispatch(setQuinielaCreated(userQuinielas.data));
            }).catch(e => {
                console.log('Error "createQuiniela": ' + e);
            });
    };
}
// DELETE_QUINIELA
export function deleteQuiniela(quinielaId) {
    return dispatch => {
        API.delete(`quinela/${quinielaId}`)
            .then(message => {
                console.log(message);
                dispatch(deleteQuinielaDispatch());
            }).catch(e => {
                console.log('Error "deleteQuiniela": ' + e);
            });
    };
}
// GET_MY_QUINIELAS
export function getMyQuinielas(userId) {
    return dispatch => {
        API.get(`user/${userId}/quinela`)
            .then(userQuinielas => {
                console.log(userQuinielas);
                dispatch(setQuinielasByUser(userQuinielas.data));
            }).catch(e => {
                console.log('Error "getMyQuinielas": ' + e);
            });
    };
}
// GET_ALL_QUINIELAS
export function getAllQuinielas(userId) {
    return dispatch => {
        API.get(`user/${userId}/quinela/belongs`)
            .then(AllQuinielas => {
                console.log(AllQuinielas);
                dispatch(setAllQuinielas(AllQuinielas.data));
            }).catch(e => {
                console.log('Error "getAllQuinielas": ' + e);
            });
    };
}
// GET_INVITATION_QUINIELAS
export function getQuinielaInvitations(userId) {
    return dispatch => {
        API.get(`user/${userId}/quinela/invited`)
            .then(UserInvitations => {
                console.log(UserInvitations);
                dispatch(setQuinielasInvitations(UserInvitations.data));
            }).catch(e => {
                console.log('Error "getQuinielaInvitations": ' + e);
            });
    };
}
// GET_SUPER_EXIST
export function superQuinielaExist() {
    return dispatch => {
        API.get('configuration/SUPER_QUINIELA/name/')
            .then(superQuiniela => {
                console.log(superQuiniela);
                dispatch(setSuperQuiniela(superQuiniela));
            }).catch(e => {
                console.log('Error "superQuiniela": ' + e);
            });
    };
}
// GET_QUINIELA_USERS
export function getQuinielaPositionsAndUsers(quinielaId) {
    return dispatch => {
        API.get(`${apiPrefix}/${quinielaId}/stats`)
            .then(usersByQuiniela => {
                console.log(usersByQuiniela);
                dispatch(setQuinielaPositionsUsers(usersByQuiniela));
            }).catch(e => {
                console.log('Error "getQuinielaPositionsAndUsers": ' + e);
            });
    };
}
// POST_INVITE_QUINIELA_USER
export function sendQuinielaInvitations(invitationBody) {
    return dispatch => {
        API.post('/quinela_invitation/invite', {
            ...invitationBody
        })
            .then(message => {
                console.log(message);
                dispatch(setUserInvited());
            }).catch(e => {
                console.log('Error "sendQuinielaInvitations": ' + e);
            });
    };
}
// QUINIELAS_BY_TYPE
export function getQuinielasByType(quinielaType) {
    return dispatch => {
        API.get(`${apiPrefix}/quiniela_type/${quinielaType}`)
            .then(quinielasByType => {
                console.log(quinielasByType);
                dispatch(setQuinielasByType(quinielasByType));
            }).catch(e => {
                console.log('Error "getQuinielasByType": ' + e);
            });
    };
}

// GET_INVITATIONS_BY_STATE
export function getInvitationsByState(userId, statusId) {
    return dispatch => {
        API.get(`/quinela_invitations/${userId}/status/${statusId}`)
            .then(invitationsByState => {
                console.log(invitationsByState);
                dispatch(setInvitationsByState(invitationsByState));
            }).catch(e => {
                console.log('Error "getInvitationsByState": ' + e);
            });
    };
}
