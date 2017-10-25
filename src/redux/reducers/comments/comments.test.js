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

it('adds a comment to a post when action is ADD_COMMENT', () => {
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
        text: 'I should not get other posts here!',
        user: 'invincible'
      }
    ]
  };
  const action = {
    type: types.ADD_COMMENT,
    postId: 'myPost',
    author: 'mom',
    comment: 'Such a cool picture son!'
  };

  const returnedState = comments(state, action);
  const expectedState = {
    myPost: [
      {
        text: 'So cool!',
        user: 'fan123'
      },
      {
        text: 'This is awesome!',
        user: 'bestfriend'
      },
      {
        text: 'Such a cool picture son!',
        user: 'mom'
      }
    ],
    otherPost: [
      {
        text: 'I should not get other posts here!',
        user: 'invincible'
      }
    ]
  };

  expect(returnedState).toMatchObject(expectedState);
});

it('adds a comment to a post with empty comments when action is ADD_COMMENT', () => {
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
        text: 'I should not get other posts here!',
        user: 'invincible'
      }
    ]
  };
  const action = {
    type: types.ADD_COMMENT,
    postId: 'thirdPost',
    author: 'mom',
    comment: 'Such a cool picture son!'
  };

  const returnedState = comments(state, action);
  const expectedState = {
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
        text: 'I should not get other posts here!',
        user: 'invincible'
      }
    ],
    thirdPost: [
      {
        text: 'Such a cool picture son!',
        user: 'mom'
      }
    ]
  };

  expect(returnedState).toMatchObject(expectedState);
});

it('throws error when adding a comment with undefined state', () => {
  const action = {
    type: types.ADD_COMMENT,
    postId: 'myPost',
    author: 'mom',
    comment: 'Such a cool picture son!'
  };

  expect(() => {
    comments(undefined, action);
  }).toThrowError('state cannot be empty or undefined');
});

it('throws error when adding a comment with no author', () => {
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
    type: types.ADD_COMMENT,
    postId: 'otherPostId',
    author: undefined,
    comment: 'Such a cool picture son!'
  };

  expect(() => {
    comments(state, action);
  }).toThrowError('author cannot be empty or undefined');
});

it('throws error when adding a comment with no comment', () => {
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
    type: types.ADD_COMMENT,
    postId: 'otherPostId',
    author: 'mom',
    comment: ''
  };

  expect(() => {
    comments(state, action);
  }).toThrowError('comment cannot be empty or undefined');
});