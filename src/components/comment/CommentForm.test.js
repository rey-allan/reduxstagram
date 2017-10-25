import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CommentForm from './CommentForm';

import { mount, shallow } from 'enzyme';

let postId;
let addComment;

beforeAll(() => {
  postId = '1';
  addComment = jest.fn();
});

it('renders without crashing', () => {
  // CommentForm uses MaterialUI components which need
  // to be rendered inside a them provider
  mount(
    <MuiThemeProvider>
      <CommentForm postId={postId} addComment={addComment} />
    </MuiThemeProvider>
  );
});

it('renders a form with two TextFields', () => {
  const wrapper = shallow(<CommentForm postId={postId} addComment={addComment} />);
  const form = wrapper.find('form');

  expect(form).toBePresent();
  expect(form.find('TextField').length).toEqual(2);
});

it('renders the TextField for author input first', () => {
  const wrapper = shallow(<CommentForm postId={postId} addComment={addComment} />);
  const form = wrapper.find('form');
  const textField = form.find('TextField').at(0);

  expect(textField).toHaveProp('hintText', 'Author');
});

it('renders the TextField for comment input second', () => {
  const wrapper = shallow(<CommentForm postId={postId} addComment={addComment} />);
  const form = wrapper.find('form');
  const textField = form.find('TextField').at(1);

  expect(textField).toHaveProp('hintText', 'Comment');
});

it('calls addComment when submitting form', () => {
  // We need to fully mount CommentForm in order for the TextFields
  // to update their references which are used when calling addComment
  const wrapper = mount(
    <MuiThemeProvider>
      <CommentForm postId={postId} addComment={addComment} />
    </MuiThemeProvider>
  );
  const form = wrapper.find('form');

  form.simulate('submit', { preventDefault: jest.fn() });
  expect(addComment).toHaveBeenCalled();
});

it('allows form to be submitted by pressing Enter', () => {
  // We need to fully mount CommentForm in order for the TextFields
  // to update their references which are used when calling addComment
  const wrapper = mount(
    <MuiThemeProvider>
      <CommentForm postId={postId} addComment={addComment} />
    </MuiThemeProvider>
  );
  const form = wrapper.find('form');

  // Simulate pressing Enter on the second input, i.e. the comment
  form.find('input').at(1).simulate('keyDown', { keyCode: 13 });
  expect(addComment).toHaveBeenCalled();
});