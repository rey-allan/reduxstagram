import React from 'react';
import PropTypes from 'prop-types';

import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import Post from '../post/Post';

import './Single.css';

const Single = ({ posts, comments, match: {params: {id}}, likePost, removeComment, addComment }) => {
  const post = retrievePostByCode(posts, id);
  const index = findPostIndex(posts, post);

  return (
    <div className="single">
      <Post post={post} comments={comments[post.code]} postIndex={index} likePost={likePost} />
      <CommentList comments={comments[post.code]} postId={post.code} removeComment={removeComment} />
      <CommentForm postId={post.code} addComment={addComment} />
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
  likePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};

export default Single;