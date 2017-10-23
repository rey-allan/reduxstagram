import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Comment from './Comment';

import { mount, shallow } from 'enzyme';

let comment;

beforeAll(() => {
  comment = {
    text: 'So cool!',
    user: 'fan123'
  };
});

it('renders without crashing', () => {
  // Comment uses MaterialUI components which need
  // to be rendered inside a theme provider
  mount(
    <MuiThemeProvider>
      <Comment comment={comment} />
    </MuiThemeProvider>
  );
});

it('renders a div with an icon and a paragraph', () => {
  const wrapper = shallow(<Comment comment={comment} />);
  const div = wrapper.find('div');

  expect(div).toBePresent();
  expect(div.find('IconButton')).toBePresent();
  expect(div.find('p')).toBePresent();
});

it('renders the user and the text correctly', () => {
  const wrapper = shallow(<Comment comment={comment} />);
  const div = wrapper.find('div');
  const p = div.find('p');

  expect(p.length).toEqual(1);
  expect(p.find('strong').text()).toEqual(comment.user);
  expect(p.text()).toEqual(`${comment.user} ${comment.text}`);
});

it('renders the IconButton as a font delete icon', () => {
  const wrapper = shallow(<Comment comment={comment} />);
  const div = wrapper.find('div');
  const button = div.find('IconButton');
  const fontIcon = button.find('FontIcon');

  expect(fontIcon).toBePresent();
  expect(fontIcon).toHaveProp('className', 'fa fa-times delete-icon');
});