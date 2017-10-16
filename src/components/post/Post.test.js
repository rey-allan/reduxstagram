import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Post from './Post';

import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

let post;
let comments;
let likePost;

beforeAll(() => {
  post = {
    code: '1',
    caption: 'Visiting Seattle!',
    likes: 24,
    id: '1',
    display_src: 'seattle.jpg'
  };

  comments = [
    {
      'text': 'So cool!',
      'user': 'fan123'
    },
    {
      'text': 'Nice shot!',
      'user': 'friendlyfriend'
    }
  ];

  likePost = jest.fn();
});

it('renders without crashing', () => {
  // Posts uses MaterialUI components which need
  // to be rendered inside a theme provider
  // It also renders a `Link` which need to be
  // rendered in the context of a Router
  const history = createMemoryHistory();
  mount(
    <MuiThemeProvider>
      <Router history={history}>
        <Post post={post} comments={comments} postIndex={0} likePost={likePost} />
      </Router>
    </MuiThemeProvider>
  );
});

it('renders a Card as the main component', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);

  expect(wrapper.find('Card')).toBePresent();
});

it('renders a CardMedia with the post display_src as image', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const cardMedia = wrapper.find('Card').find('CardMedia');

  expect(cardMedia).toBePresent();
  expect(cardMedia.find('img')).toHaveHTML(`<img src="${post.display_src}" alt="${post.caption}"/>`);
});

it('links the CardMedia to the single view', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const cardMedia = wrapper.find('Card').find('CardMedia');
  const link = cardMedia.parent();

  expect(link).toBePresent();
  expect(link).toHaveProp('to', `/posts/${post.code}`);
});

it('renders a CardText with the post caption', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const cardText = wrapper.find('Card').find('CardText');

  expect(cardText).toBePresent();
  expect(cardText.props().children).toEqual(post.caption);
});

it('renders CardActions with two RaisedButtons', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const cardActions = wrapper.find('Card').find('CardActions');

  expect(cardActions).toBePresent();
  expect(cardActions.find('RaisedButton').length).toEqual(2);
});

it('renders a RaisedButton for liking a post', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const likeButton = wrapper.find('Card').find('CardActions').find('RaisedButton').at(0);

  expect(likeButton).toHaveProp('label', post.likes);
  expect(likeButton).toHaveProp('icon');
  expect(likeButton).toHaveProp('onClick');
});

it('calls the likePost function from props when clicking the RaisedButton for likes', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const likeButton = wrapper.find('Card').find('CardActions').find('RaisedButton').at(0);

  likeButton.simulate('click');
  expect(likePost).toHaveBeenCalled();
});

it('renders a RaisedButton for making a comment', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const commentButton = wrapper.find('Card').find('CardActions').find('RaisedButton').at(1);

  expect(commentButton).toHaveProp('label', comments.length.toString());
  expect(commentButton).toHaveProp('icon');
});

it('links the RaisedButton for comments to the single view', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const commentButton = wrapper.find('Card').find('CardActions').find('RaisedButton').at(1);
  const link = commentButton.parent();

  expect(link).toBePresent();
  expect(link).toHaveProp('to', `/posts/${post.code}`);
});

it('uses "0" as the RaisedButton label when no comments are present', () => {
  const wrapper = shallow(<Post post={post} comments={[]} postIndex={0} likePost={likePost} />);
  const commentButton = wrapper.find('Card').find('CardActions').find('RaisedButton').at(1);

  expect(commentButton).toHaveProp('label', '0');
});

it('contains a transition associated with the number of likes', () => {
  const wrapper = shallow(<Post post={post} comments={comments} postIndex={0} likePost={likePost} />);
  const transition = wrapper.find('CSSTransitionGroup');

  expect(transition).toBePresent();
  expect(transition.find('span').props().children).toEqual(post.likes);
});