import * as types from '../../actions/types';
import comments from './comments';

it('returns a default state for an unsupported action and undefined state', () => {
  const returnedState = comments(undefined, {type: 'SOME_ACTION'});
  const expectedState = [];

  expect(returnedState).toMatchObject(expectedState);
});

it('returns the current state for an unsupported action', () => {
  const state = {
    myPost: [
      {
        text: 'So cool!',
        user: 'fan123'
      },
      {
        text: 'This is awesome!',
        user: 'bestfriend'
      }
    ]
  };
  const returnedState = comments(state, {type: 'SOME_ACTION'});

  expect(returnedState).toMatchObject(state);
});

it('removes the comment from a post when action is REMOVE_COMMENT', () => {
  const state = {
    myPost: [
      {
        text: 'So cool!',
        user: 'fan123'
      },
      {
        text: 'This is awesome!',
        user: 'bestfriend'
      }
    ],
    otherPost: [
      {
        text: 'I should not be removed!',
        user: 'invincible'
      }
    ]
  };
  const action = {
    type: types.REMOVE_COMMENT,
    postId: 'myPost',
    index: 0
  };

  const returnedState = comments(state, action);
  const expectedState = {
    myPost: [
      {
        text: 'This is awesome!',
        user: 'bestfriend'
      }
    ],
    otherPost: [
      {
        text: 'I should not be removed!',
        user: 'invincible'
      }
    ]
  };

  expect(returnedState).toMatchObject(expectedState);
});

it('throws error when removing a comment with undefined state', () => {
  const action = {
    type: types.REMOVE_COMMENT,
    postId: 'myPost',
    index: 0
  };

  expect(() => {
    comments(undefined, action);
  }).toThrowError('state cannot be empty or undefined');
});

it('throws error when removing a comment with invalid postId', () => {
  const state = {
    myPost: [
      {
        text: 'So cool!',
        user: 'fan123'
      },
      {
        text: 'This is awesome!',
        user: 'bestfriend'
      }
    ]
  };
  const action = {
    type: types.REMOVE_COMMENT,
    postId: 'otherPostId',
    index: 0
  };

  expect(() => {
    comments(state, action);
  }).toThrowError('Invalid postId: otherPostId');
});

it('throws error when removing a comment with invalid index', () => {
  const state = {
    myPost: [
      {
        text: 'So cool!',
        user: 'fan123'
      },
      {
        text: 'This is awesome!',
        user: 'bestfriend'
      }
    ]
  };
  const action = {
    type: types.REMOVE_COMMENT,
    postId: 'myPost',
    index: 999
  };

  expect(() => {
    comments(state, action);
  }).toThrowError('Invalid comment index: 999');
});