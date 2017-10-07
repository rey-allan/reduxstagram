import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'

import AppContainer from './components/app/AppContainer';
import Grid from './components/grid/Grid';
import Single from './components/single/Single';

import { history, store} from './redux/store';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <Route exact path="/" component={Grid} />
        <Route path="/posts/:id" component={Single} />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();