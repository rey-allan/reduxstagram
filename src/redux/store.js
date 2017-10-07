import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';

import createHistory from 'history/createHashHistory';
import rootReducer from './reducers/root';

import comments from '../data/comments';
import posts from '../data/posts';

const defaultState = {
  posts,
  comments
};

// HashHistory is needed to work on Github Pages
const history = createHistory();

const enhancers = compose(
  applyMiddleware(routerMiddleware(history)),
  // Enhance store to use React Dev Tools
  window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(rootReducer, defaultState, enhancers);

export { store, history };