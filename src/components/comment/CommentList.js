import React from 'react';
import PropTypes from 'prop-types'
import Comment from './Comment';

import { List } from 'material-ui/List';

const CommentList = ({ comments, postId, removeComment }) => {
  comments = comments || [];

  return (
    <List>
      {
        comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            index={index}
            postId={postId}
            removeComment={removeComment}
          />
        ))
      }
    </List>
  );
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired
};

export default CommentList;