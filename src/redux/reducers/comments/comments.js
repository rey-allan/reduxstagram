import * as types from '../../actions/types';

const comments = (state=[], action) => {
  let comments;
  let newState;

  switch (action.type) {
    case types.REMOVE_COMMENT:
      validateState(state);

      comments = getCommentsForPostOrThrow(action.postId, state);
      validateCommentIndex(action.index, comments.length);

      newState = Object.assign({}, state);
      newState[action.postId] = removeComment(action.index, comments);

      return newState;
    case types.ADD_COMMENT:
      validateState(state);
      validatePropertyIsNotEmptyOrUndefined(action.author, 'author');
      validatePropertyIsNotEmptyOrUndefined(action.comment, 'comment');

      comments = getCommentsForPost(action.postId, state);
      newState = Object.assign({}, state);
      newState[action.postId] = addComment(action.author, action.comment, comments);

      return newState;
    default:
      return state;
  }
};

const getCommentsForPostOrThrow = (postId, state) => {
  const comments = getCommentsForPost(postId, state);

  if (comments === undefined) {
    throw Error(`Invalid postId: ${postId}`);
  }

  return comments;
};

const getCommentsForPost = (postId, state) => {
  return state[postId];
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

const validatePropertyIsNotEmptyOrUndefined = (property, name) => {
  if (undefined === property || property === '') {
    throw Error(`${name} cannot be empty or undefined`);
  }
};

const addComment = (author, comment, comments) => {
  const newComments = Object.assign([], comments);
  newComments.push({ text: comment, user: author });

  return newComments;
};

export default comments;