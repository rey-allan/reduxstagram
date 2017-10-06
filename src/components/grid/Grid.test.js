import React from 'react';
import Grid from './Grid';

import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
  mount(<Grid/>);
});

it('renders a header', () => {
  const wrapper = shallow(<Grid/>);
  const header = <h1>I am the Grid!</h1>;

  expect(wrapper).toContainReact(header);
});