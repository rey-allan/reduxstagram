import * as types from '../../actions/types';
import posts from './posts';

it('returns a default state for an unsupported action and undefined state', () => {
  const returnedState = posts(undefined, {type: 'SOME_ACTION'});
  const expectedState = [];

  expect(returnedState).toMatchObject(expectedState);
});

it('returns the current state for an unsupported action', () => {
  const state = [
    {
      id: 1,
      caption: 'This is a post!',
      likes: 24
    }
  ];
  const returnedState = posts(state, {type: 'SOME_ACTION'});

  expect(returnedState).toMatchObject(state);
});

it('increments the likes for a post when action is LIKE_POST', () => {
  const state = [
    {
      id: 1,
      caption: 'This is a post!',
      likes: 24
    }
  ];
  const action = {
    type: types.LIKE_POST,
    index: 0
  };

  const returnedState = posts(state, action);
  const expectedState = [
    {
      id: 1,
      caption: 'This is a post!',
      likes: 25
    }
  ];

  expect(returnedState).toMatchObject(expectedState);
});

it('throws error when action is known but state is undefined', () => {
  const action = {
    type: types.LIKE_POST,
    index: 0
  };

  expect(() => {
    posts(undefined, action);
  }).toThrowError('state cannot be empty or undefined');
});

it('throws error when action contains an invalid post index', () => {
  const state = [
    {
      id: 1,
      caption: 'This is a post!',
      likes: 24
    }
  ];
  const action = {
    type: types.LIKE_POST,
    index: 999
  };

  expect(() => {
    posts(state, action);
  }).toThrowError('Invalid post index: 999');
});