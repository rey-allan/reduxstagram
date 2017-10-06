import React from 'react';
import ReactDOM from 'react-dom';
import createHashHistory from 'history/createHashHistory';

import { Router } from 'react-router';
import { Route } from 'react-router-dom';

import App from './components/app/App';
import Grid from './components/grid/Grid';
import Single from './components/single/Single';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history = createHashHistory();

ReactDOM.render(
  <Router history={history}>
    <App>
      <Route exact path="/" component={Grid} />
      <Route path="/post/:postId" component={Single}/>
    </App>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();