import React from 'react';
import PropTypes from 'prop-types';

import CommentList from '../comment/CommentList';
import Post from '../post/Post';

import './Single.css';

const Single = ({ posts, comments, match: {params: {id}}, likePost }) => {
  const post = retrievePostByCode(posts, id);
  const index = findPostIndex(posts, post);

  return (
    <div className="single">
      <Post post={post} comments={comments[post.code]} postIndex={index} likePost={likePost} />
      <CommentList comments={comments[post.code]} />
    </div>
  );
};

const retrievePostByCode = (posts, code) => (
  posts.find(post => post.code === code)
);

const findPostIndex = (posts, post) => (
  posts.indexOf(post)
)

Single.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired
};

export default Single;