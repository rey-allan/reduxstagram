import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import './CommentForm.css';

class CommentForm extends React.Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this._styles = {
      underlineFocusStyle: {
        borderColor: "#125688"
      }
    };
  }

  render() {
    // <input type="submit" hidden /> is used to allow the user to use "Enter" to submit
    return (
      <form onSubmit={this._handleSubmit} ref={(form) => this._commentForm = form}>
        <TextField
          className="comment-form-input"
          hintText="Author"
          underlineFocusStyle={this._styles.underlineFocusStyle}
          ref={(author) => this._author = author}
        />
        <TextField
          className="comment-form-input"
          hintText="Comment"
          underlineFocusStyle={this._styles.underlineFocusStyle}
          ref={(comment) => this._comment = comment}
        />
        <input type="submit" hidden/>
      </form>
    );
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.props.postId, this._author.getValue(), this._comment.getValue());
    this._resetForm();
  }

  _resetForm = () => {
    this._commentForm.reset();
    // We need to explicitly set the state of the TextFields to force an update
    // This will make them display the hint text again
    this._author.setState({ hasValue: false });
    this._comment.setState({ hasValue: false });
  }
}

export default CommentForm;