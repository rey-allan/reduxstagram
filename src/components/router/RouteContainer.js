import React from 'react';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types'

/**
 * A high-order component that wraps a
 * React Router `Route`to allow passing
 * custom `props`. Based on:
 * https://github.com/ReactTraining/react-router/issues/4105#issuecomment-289195202
 */
const RouteContainer = ({component, ...props}) => {
  // There is a known caveat with how props are being merged.
  // The `routerProps` have to be passed as the second argument
  // in order for it to be the source truth of `location` and
  // `match` parameters. If they are passed as the first
  // argument, then `prop` will override these values!
  return <Route {...props} render={(routerProps) => React.createElement(component, mergeProps(props, routerProps))} />
};

const mergeProps = (...props) => (
  Object.assign(...props)
);

RouteContainer.PropTypes = {
  component: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired
};

export default RouteContainer;