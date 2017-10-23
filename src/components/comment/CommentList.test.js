import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CommentList from './CommentList';

import { mount, shallow } from 'enzyme';

let comments;
let postId;
let removeComment;

beforeAll(() => {
  comments = [
    {
      text: 'So cool!',
      user: 'fan123'
    },
    {
      text: 'This is awesome!',
      user: 'bestfriend'
    }
  ];

  postId = '1';
  removeComment = jest.fn();
});

it('renders without crashing', () => {
  // CommentList uses MaterialUI components which need
  // to be rendered inside a theme provider
  mount(
    <MuiThemeProvider>
      <CommentList comments={comments} postId={postId} removeComment={removeComment} />
    </MuiThemeProvider>
  );
});

it('renders an empty list when no comments are passed', () => {
  const wrapper = shallow(<CommentList postId={postId} removeComment={removeComment} />);
  const list = wrapper.find('List');

  expect(list).toBePresent();
  expect(list.props().children.length).toEqual(0);
});

it('renders a list with as many comments as provided', () => {
  const wrapper = shallow(<CommentList comments={comments} postId={postId} removeComment={removeComment} />);
  const list = wrapper.find('List');
  const renderedComments = wrapper.find('Comment');

  expect(renderedComments.length).toEqual(comments.length);
  renderedComments.forEach((renderedComment, index) => {
    expect(renderedComment).toHaveProp('comment', comments[index]);
    expect(renderedComment).toHaveProp('index', index);
    expect(renderedComment).toHaveProp('postId', postId);
    expect(renderedComment).toHaveProp('removeComment');
  });
});