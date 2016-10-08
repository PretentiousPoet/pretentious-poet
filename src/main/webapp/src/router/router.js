import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'container/App';
import Hello from 'container/Hello';
import Goodbye from 'container/Goodbye';


const Routes = (
  <Route path="/" name="app" component={App}>
    <Route path="hello" component={Hello}/>
    <Route path="goodbye" component={Goodbye}/>
  </Route>
);

export default Routes;
