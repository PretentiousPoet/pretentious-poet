import {combineReducers} from 'redux';
import stub from './stub';

import {routerReducer as routing} from 'react-router-redux';

export default combineReducers({
    stub,
    routing
});
