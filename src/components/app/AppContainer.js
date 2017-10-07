import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import App from './App';
import * as actionCreators from '../../redux/actions/creators';

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// Wrap container using `withRouter` since react-router-4.x.x
// does not work with `connect` anymore
// See: https://github.com/ReactTraining/react-router/issues/4671
const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer;