import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import comments from './comments/comments';
import posts from './posts/posts';

const rootReducer = combineReducers({posts, comments, routing: routerReducer});

export default rootReducer;