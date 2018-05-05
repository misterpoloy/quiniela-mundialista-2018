import axios from 'axios';
import { PLGETUSER_URL } from '../constants/urls';
import { SET_CURRENT_USER } from '../actions/types';


export function serCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function login() {
    return dispatch => {
        const userToken = localStorage.getItem('PrensaToken');
        return axios.get(PLGETUSER_URL + userToken + '.json').then(res => {
            if(res) {
                const user = res.data.data;
                dispatch(serCurrentUser(user));
            }
        }).catch(e => {
            console.log('Se ha producido un error con PL Connect: ' + e);
        });
    };
}
