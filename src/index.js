import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux'

import AppContainer from './components/app/AppContainer';
import ResponsiveGrid from './components/grid/ResponsiveGrid';
import RouteContainer from './components/router/RouteContainer';
import Single from './components/single/Single';

import { history, store} from './redux/store';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <RouteContainer exact path="/" component={ResponsiveGrid} />
        <RouteContainer path="/posts/:id" component={Single} />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();