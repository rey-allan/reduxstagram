import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from './Grid';

import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

let posts;
let comments;
let likePost;

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

  comments = {};

  likePost = jest.fn();
});

it('renders without crashing', () => {
  // Grid uses MaterialUI components which need
  // to be rendered inside a theme provider
  // It also renders a `Post` which in turn uses
  // ReactRouter components that need to be
  // rendered in the context of a Router
  const history = createMemoryHistory();
  mount(
    <MuiThemeProvider>
      <Router history={history}>
        <Grid posts={posts} comments={comments} likePost={likePost} />
      </Router>
    </MuiThemeProvider>
  );
});

it('renders a GridList with 3 columns', () => {
  const wrapper = shallow(<Grid posts={posts} comments={comments} likePost={likePost} />);
  
  expect(wrapper.find('GridList')).toHaveProp('cols', 3);
});

it('renders a GridList with auto cell height', () => {
  const wrapper = shallow(<Grid posts={posts} comments={comments} likePost={likePost} />);
  
  expect(wrapper.find('GridList')).toHaveProp('cellHeight', 'auto');
});

it('renders as many GridTile(s) as posts', () => {
  const wrapper = shallow(<Grid posts={posts} comments={comments} likePost={likePost} />);
  
  expect(wrapper.find('GridTile').length).toEqual(posts.length);
});

it('renders a Post, with appropriate props, for each GridTile', () => {
  const wrapper = shallow(<Grid posts={posts} comments={comments} likePost={likePost} />);

  wrapper.find('GridTile').forEach((gridTile, index) => {
    const post = gridTile.find('Post');

    expect(post).toBePresent();
    expect(post).toHaveProp('post', posts[index]);
    expect(post).toHaveProp('comments', comments);
    expect(post).toHaveProp('postIndex', index);
    expect(post).toHaveProp('likePost', likePost);
  });
});