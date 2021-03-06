import React from 'react';
import PropTypes from 'prop-types'
import Post from '../post/Post';

import { GridList, GridTile } from 'material-ui/GridList';

import './Grid.css'

const Grid = ({ posts, comments, columns, likePost }) => (
  <GridList cols={columns || 1} cellHeight="auto" className="grid">
    {
      posts.map((post, index) => (
        <GridTile key={post.code}>
          <Post post={post} comments={comments[post.code]} postIndex={index} likePost={likePost} />
        </GridTile>
      ))
    }
  </GridList>
);

Grid.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  columns: PropTypes.number,
  likePost: PropTypes.func.isRequired
};

export default Grid;