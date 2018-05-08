import * as types from '../actions/types';
import isEmpty from 'lodash/isEmpty';
// utils
const _ = require('lodash');

const initialState = {
    UserQuinielas: [],
    AllQuinielas: [],
    UserInvitations: [],
    Quiniela: {},
    superQuiniela: 0,
    usersByQuiniela: {},
    refusedInvitations: [],
    acceptedInvitations: [],
    sendInvitations: [],
    quinielasByType: {},
    invitationsByState: {},
    recentQuiniela: {},
    quinielaStructures: [],
    error: false
};

export default (state = initialState, action = {}) => {
    function updateInvitations(invitationId) {
        const CopyUserInvitationsArray = state.UserInvitations;
        const invitationIndex = _.findIndex(CopyUserInvitationsArray, invitation => {
            return invitation.INVITACIONES_ID === parseInt(invitationId, 10);
        });
        const newInvitations = [
            ...CopyUserInvitationsArray.slice(0, invitationIndex),
            ...CopyUserInvitationsArray.slice(invitationIndex + 1)
        ];
        return newInvitations;
    }

    switch (action.type) {
        case types.GET_MY_QUINIELAS: // action done
            return {
                ...state,
                error: false,
                UserQuinielas: action.UserQuinielas
            };
        case types.GET_QUINIELA_STRUCTURES: // action done
            return {
                ...state,
                error: false,
                quinielaStructures: action.quinielaStructures
            };
        case types.ACCEPT_INVITATION_QUINIELA: // ***
            const newInvitations = updateInvitations(action.quinielaId);
            const AllQuinielasCopy = state.AllQuinielas;
            const invitationIndex = _.findIndex(state.UserInvitations, invitation => {
                return invitation.INVITACIONES_ID === parseInt(action.quinielaId, 10);
            });
            const AllQuinielasCopyNew = [
                ...AllQuinielasCopy, state.UserInvitations[invitationIndex]
            ];
            return {
                ...state,
                error: false,
                UserInvitations: newInvitations,
                AllQuinielas: AllQuinielasCopyNew
            };
        case types.REFUSE_INVITATION_QUINIELA: // ***
            const newRefused = updateInvitations(action.quinielaId);
            return {
                ...state,
                error: false,
                UserInvitations: newRefused
            };
        case types.GET_QUINIELA_ERROR:
            return {
                ...state,
                error: true
            };
        case types.GET_ALL_QUINIELAS: // action done
            return {
                ...state,
                error: false,
                AllQuinielas: action.AllQuinielas,
            };
        case types.GET_INVITATION_BY_STATUS: // action done
            return {
                ...state,
                error: false,
                invitationsById: action.invitationsById
            };
            /**  invitations reducers **/
        case types.GET_INVITATION_SENT: // action done
            return {
                ...state,
                error: false,
                sendInvitations: action.sendInvitations
            };
        case types.GET_INVITATION_ACCEPTED: // action done
            return {
                ...state,
                error: false,
                acceptedInvitations: action.acceptedInvitations
            };
        case types.GET_INVITATION_REFUSED: // action done
            return {
                ...state,
                error: false,
                refusedInvitations: action.refusedInvitations
            };
        /**  invitations reducers END **/
        case types.GET_INVITATION_QUINIELAS: // action done
            return {
                ...state,
                error: false,
                UserInvitations: action.UserInvitations
            };
        case types.POST_QUINIELA: // action done
            return {
                ...state,
                recentQuiniela: action.recentQuiniela,
                error: false,
            };
        case types.GET_QUINIELA: // action done
            return {
                ...state,
                error: false,
                Quiniela: action.Quiniela
            };
        case types.DELETE_QUINIELA: // action done
            return {
                ...state,
                error: false,
            };
        case types.GET_SUPER_EXIST: // action done
            return {
                ...state,
                error: false,
                superQuiniela: action.superQuiniela
            };
        case types.GET_QUINIELA_USERS: // action done
            return {
                ...state,
                error: false,
                usersByQuiniela: !isEmpty(action.usersByQuiniela)
            };
        case types.QUINIELAS_BY_TYPE: // action done
            return {
                ...state,
                error: false,
                quinielasByType: !isEmpty(action.quinielasByType)
            };
        case types.GET_INVITATIONS_BY_STATE: // 10
            return {
                ...state,
                error: false,
                invitationsByState: !isEmpty(action.invitationsByState)
            };
        case types.POST_INVITE_QUINIELA_USER: // action done
            return {
                ...state,
                error: false,
            };
        default:
            return {
                ...state,
                error: false,
            };
    }
};

