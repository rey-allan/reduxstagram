import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Single from './Single';

import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

let posts;
let comments;
let likePost;
let match;
let selectedPost;

beforeAll(() => {
  posts = [
    {
      code: '1',
      caption: 'Visiting Seattle!',
      likes: 24,
      id: '1',
      display_src: 'seattle.jpg'
    },
    {
      code: '2',
      caption: 'Eating @PikePlaceMarket',
      likes: 30,
      id: '2',
      display_src: 'chowder.jpg'
    }
  ];

  comments = {
    '1': [
      {
        text: 'So cool!',
        'user': 'fan123'
      }
    ]
  };

  likePost = jest.fn();

  match = {
    params: {
      id: '1'
    }
  };

  selectedPost = posts.find(post => post.code === match.params.id);
  selectedPost.index = posts.indexOf(selectedPost);
});

it('renders without crashing', () => {
  // Single renders a `Post` which uses Material UI components
  // that need to be rendered inside a theme provider. It also
  // uses ReactRouter component that need to be rendered in the
  // context of a Router.
  const history = createMemoryHistory();
  mount(
    <MuiThemeProvider>
      <Router history={history}>
        <Single posts={posts} comments={comments} match={match} likePost={likePost} />
      </Router>
    </MuiThemeProvider>
  );
});

it('renders a Post with appropriate props', () => {
  const wrapper = shallow(<Single posts={posts} comments={comments} match={match} likePost={likePost} />);
  const post = wrapper.find('Post');

  expect(post).toBePresent();
  expect(post).toHaveProp('post', selectedPost);
  expect(post).toHaveProp('comments', comments[selectedPost.code]);
  expect(post).toHaveProp('postIndex', selectedPost.index);
  expect(post).toHaveProp('likePost');
});