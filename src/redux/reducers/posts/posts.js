import * as types from '../../actions/types';

const posts = (state=[], action) => {
  switch (action.type) {
    case types.LIKE_POST:
      validateState(state);
      validatePostIndex(action.index, state.length);

      const newState = cloneState(state);
      newState[action.index] = incrementLikesForPost(state[action.index]);

      return newState;
    default:
      return state;
  }
}

const validateState = (state) => {
  if (undefined === state || state.length === 0) {
    throw Error('state cannot be empty or undefined');
  }
};

const validatePostIndex = (index, numberOfPosts) => {
  if (index < 0 || index >= numberOfPosts) {
    throw Error(`Invalid post index: ${index}`);
  }
}

const cloneState = (state) => (
  Object.assign([], state)
);

const incrementLikesForPost = (post) => (
  {
    ...post,
    likes: post.likes + 1
  }
);

export default posts;