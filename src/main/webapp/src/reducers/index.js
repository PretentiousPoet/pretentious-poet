import {combineReducers} from 'redux';
import stub from './stub';
import url from './url';

import {routerReducer as routing} from 'react-router-redux';

export default combineReducers({
    stub,
    url,
    routing
});
