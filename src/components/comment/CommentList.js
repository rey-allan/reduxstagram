import React from 'react';
import Comment from './Comment';

import { List } from 'material-ui/List';

const CommentList = ({ comments }) => {
  comments = comments || [];

  return (
    <List>
      {
        comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      }
    </List>
  );
};

export default CommentList;