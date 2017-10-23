import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ResponsiveGrid from './ResponsiveGrid';

import { mount, shallow } from 'enzyme';

let mediaQueriesToTest;
let addListenerMock;
let removeListenerMock;

beforeEach(() => {
  mediaQueriesToTest = [
    '(max-width: 767px)', '(min-width: 768px)', '(min-width: 992px)'
  ];
  addListenerMock = jest.fn();
  removeListenerMock = jest.fn();
});

it('renders without crashing', () => {
  _mockWindowMatchMedia();
  // ResponsiveGrid renders a `Grid` which uses MaterialUI
  // components that need to be rendered inside a theme provider
  mount(
    <MuiThemeProvider>
      <ResponsiveGrid posts={[]} comments={{}} likePost={jest.fn()} />
    </MuiThemeProvider>
  );
});

it('adds a listener for every media query when mounting', () => {
  _mockWindowMatchMedia();

  const wrapper = mount(
    <MuiThemeProvider>
      <ResponsiveGrid posts={[]} comments={{}} likePost={jest.fn()} />
    </MuiThemeProvider>
  );

  expect(addListenerMock).toHaveBeenCalledTimes(mediaQueriesToTest.length);
});

it('removes the listeners when unmounting', () => {
  _mockWindowMatchMedia();

  const wrapper = mount(
    <MuiThemeProvider>
      <ResponsiveGrid posts={[]} comments={{}} likePost={jest.fn()} />
    </MuiThemeProvider>
  );
  wrapper.unmount();

  expect(removeListenerMock).toHaveBeenCalledTimes(mediaQueriesToTest.length);
});

it('renders a Grid with 1 column when the screen width <= 767px', () => {
  _mockWindowMatchMedia();
  const wrapper = shallow(<ResponsiveGrid posts={[]} comments={{}} likePost={jest.fn()} />);

  expect(wrapper.find('Grid')).toHaveProp('columns', 1);
});

it('renders a Grid with 2 columns when the screen width >= 768px', () => {
  _mockWindowMatchMedia([false, true, false]);
  const wrapper = shallow(<ResponsiveGrid posts={[]} comments={{}} likePost={jest.fn()} />);

  expect(wrapper.find('Grid')).toHaveProp('columns', 2);
});

it('renders a Grid with 3 columns when the screen width >= 992px', () => {
  _mockWindowMatchMedia([false, false, true]);
  const wrapper = shallow(<ResponsiveGrid posts={[]} comments={{}} likePost={jest.fn()} />);

  expect(wrapper.find('Grid')).toHaveProp('columns', 3);
});

const _mockWindowMatchMedia = ((matches=[true, false, false]) => {
  const matchMediaMock = jest.fn();
  matches.forEach((match, index) => {
    matchMediaMock.mockReturnValueOnce({
      matches: match,
      media: mediaQueriesToTest[index],
      addListener: addListenerMock,
      removeListener: removeListenerMock
    });
  });

  global.window.matchMedia = matchMediaMock;
});
