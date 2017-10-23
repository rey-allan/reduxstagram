import * as types from '../../actions/types';

const comments = (state=[], action) => {
  switch (action.type) {
    case types.REMOVE_COMMENT:
      const comments = retrieveCommentsForPost(action.postId, action.index, state);
      const newState = Object.assign({}, state);
      newState[action.postId] = removeComment(action.index, comments);

      return newState;
    default:
      return state;
  }
};

const retrieveCommentsForPost = (postId, index, state) => {
  validateState(state);

  const comments = state[postId];
  if (comments === undefined) {
    throw Error(`Invalid postId: ${postId}`);
  }

  validateCommentIndex(index, comments.length);

  return comments;
};

const validateState = (state) => {
  if (undefined === state || state.length === 0) {
    throw Error('state cannot be empty or undefined');
  }
};

const validateCommentIndex = (index, numberOfComments) => {
  if (index < 0 || index >= numberOfComments) {
    throw Error(`Invalid comment index: ${index}`);
  }
};

const removeComment = (index, comments) => {
  const newComments = Object.assign([], comments);
  newComments.splice(index, 1);

  return newComments;
};

export default comments;