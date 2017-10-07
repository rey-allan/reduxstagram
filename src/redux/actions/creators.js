import * as types from './types';

function addComment(postId, author, comment) {
  return {
    type: types.ADD_COMMENT,
    postId,
    author,
    comment
  }
}

function likePost(index) {
  return {
    type: types.LIKE_POST,
    index
  }
}

function removeComment(postId, index) {
  return {
    type: types.REMOVE_COMMENT,
    postId,
    index
  }
}

export {
  addComment,
  likePost,
  removeComment
}