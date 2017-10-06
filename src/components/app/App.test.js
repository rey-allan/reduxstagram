import React from 'react';
import App from './App';

import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { Link } from 'react-router-dom';

it('renders without crashing', () => {
  // `App` has to be rendered inside the context of a `Router` 
  // because of its use of `Link` component
  // See: https://github.com/ReactTraining/react-router/issues/2740
  const history = createMemoryHistory();
  const router = (
    <Router history={history}>
      <App />
    </Router>
  );

  mount(router);
});

it('renders title of the app', () => {
  const wrapper = shallow(<App />);
  const title = <h1><Link to="/">Reduxstagram</Link></h1>;

  expect(wrapper).toContainReact(title);
});

it('renders any children passed', () => {
  const wrapper = shallow(
    <App>
      <p>This test will pass.</p>
      <a>Click Me!</a>
    </App>
  );

  expect(wrapper).toContainReact(<p>This test will pass.</p>);
  expect(wrapper).toContainReact(<a>Click Me!</a>);
});
