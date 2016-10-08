import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import DevTools from 'config/devtools';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Router } from 'react-router';
import Routes from 'router/router';
import 'stylus/main.styl';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <div>
            {devTools}
            <Router history={history} routes={Routes}/>
        </div>
    </Provider>,
    document.getElementById('root')
);
