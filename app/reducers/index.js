import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import theme from './theme';
import auth from './auth';
import quiniela from './quiniela';
import game from './game';

const rootReducer = combineReducers({
    theme,
    auth,
    quiniela,
    game,
    routing
});

export default rootReducer;
