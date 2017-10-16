import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';

import './Post.css'

const Post = ({ post, comments, postIndex, likePost }) => (
  <Card className="post">
    <Link to={`/posts/${post.code}`}>
      <CardMedia>
        <img src={post.display_src} alt={post.caption} />
      </CardMedia>
    </Link>
    <CardText>{post.caption}</CardText>
    <CardActions>
      <RaisedButton
        label={post.likes}
        icon={<FontIcon className="fa fa-heart" color="#125688" />}
        onClick={() => likePost(postIndex)}
      />
      <Link to={`/posts/${post.code}`}>
        <RaisedButton
          label={comments[post.code] ? comments[post.code].length.toString() : "0"}
          icon={<FontIcon className="fa fa-comments"
          color="#125688" />}
        />
      </Link>
    </CardActions>

    <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      <span key={post.likes} className="likes-heart">{post.likes}</span>
    </CSSTransitionGroup>
  </Card>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  likePost: PropTypes.func.isRequired
};

export default Post;