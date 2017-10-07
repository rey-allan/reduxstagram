import * as actionCreators from './creators';

it('returns the correct ADD_COMMENT action', () => {
  const postId = 1;
  const author = 'rey-allan';
  const comment = 'This is a cool comment!';

  const returnedAction = actionCreators.addComment(postId, author, comment);
  const expectedAction = {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  };

  expect(returnedAction).toMatchObject(expectedAction);
});

it('returns the correct LIKE_POST action', () => {
  const index = 1;

  const returnedAction = actionCreators.likePost(index);
  const expectedAction = {
    type: 'LIKE_POST',
    index
  };

  expect(returnedAction).toMatchObject(expectedAction);
});

it('returns the correct REMOVE_COMMENT action', () => {
  const postId = 1;
  const index = 1;

  const returnedAction = actionCreators.removeComment(postId, index);
  const expectedAction = {
    type: 'REMOVE_COMMENT',
    postId,
    index
  };

  expect(returnedAction).toMatchObject(expectedAction);
});