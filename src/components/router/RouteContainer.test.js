import React from 'react';
import RouterContainer from './RouteContainer';

import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';

let Dummy;
let history;

beforeEach(() => {
  Dummy = () => <h1>I'm a component!</h1>;
  history = createMemoryHistory();
});

it('renders without crashing', () => {
  mount(
    <Router history={history}>
      <RouterContainer component={Dummy} />
    </Router>
  );
});

it('renders a Route element', () => {
  const wrapper = mount(
    <Router history={history}>
      <RouterContainer component={Dummy} path="/" />
    </Router>
  );

  expect(wrapper.find(Route)).toBeDefined();
});

it('renders a child component inside a Route element', () => {
  const wrapper = mount(
    <Router history={history}>
      <RouterContainer component={Dummy} path="/" />
    </Router>
  );

  expect(wrapper.find(Route).find(Dummy)).toBeDefined();
});

it('renders child component with props', () => {
  const wrapper = mount(
    <Router history={history}>
      <RouterContainer component={Dummy} path="/" myProp="Success!" />
    </Router>
  );
  const component = wrapper.find(Route).find(Dummy);

  expect(component.props().myProp).toBeDefined();
  expect(component.props().myProp).toEqual("Success!");
});