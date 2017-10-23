import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types'

import './Comment.css';

const deleteIcon = (
  <IconButton className="delete-button">
    <FontIcon className="fa fa-times delete-icon" color="#c7c7c7" />
  </IconButton>
);

const Comment = ({ comment }) => (
  <div>
    {deleteIcon}
    <p className="comment">
      <strong>{comment.user}</strong>&nbsp;{comment.text}
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;