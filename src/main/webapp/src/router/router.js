import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'container/App';
import Home from 'container/Home';
import Poem from 'container/Poem';


const Routes = (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={Home}/>
    <Route path="poem" component={Poem}/>
  </Route>
);

export default Routes;
