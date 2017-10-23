import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types'

import './Comment.css';

const deleteIcon = (postId, index, removeComment) => (
  <IconButton className="delete-button" onClick={() => removeComment(postId, index)}>
    <FontIcon className="fa fa-times delete-icon" color="#c7c7c7" />
  </IconButton>
);

const Comment = ({ comment, index, postId, removeComment }) => (
  <div>
    {deleteIcon(postId, index, removeComment)}
    <p className="comment">
      <strong>{comment.user}</strong>&nbsp;{comment.text}
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  postId: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired
};

export default Comment;