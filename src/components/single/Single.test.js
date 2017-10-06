import React from 'react';
import Single from './Single';

import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
  mount(<Single/>);
});

it('renders a header', () => {
  const wrapper = shallow(<Single/>);
  const header = <h1>I am the Single!</h1>;

  expect(wrapper).toContainReact(header);
});