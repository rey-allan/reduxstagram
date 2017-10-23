import React from 'react';
import Grid from './Grid';

/**
 * High-order component that provides responsiveness
 * functionality to the Grid component by listening
 * and acting on changes on media queries
 */
class ResponsiveGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // Maps queries to props that will be passed
    // down to the Grid component
    this._queries = [
      {
        query: '(max-width: 767px)',
        props: { columns: 1}
      },
      {
        query: '(min-width: 768px)',
        props: { columns: 2 }
      },
      {
        query: '(min-width: 992px)',
        props: { columns: 3 }
      }
    ];

    this._matchMediaQueries = [];
  }

  componentWillMount() {
    this._queries.forEach(mediaQuery => {
      const mediaQueryList = window.matchMedia(mediaQuery.query);
      this._matchMediaQueries.push(mediaQueryList);
      this._handleMediaQueryEvent(mediaQueryList);
    });
  }

  componentDidMount() {
    this._matchMediaQueries.forEach(matchMediaQuery => {
      matchMediaQuery.addListener(this._handleMediaQueryEvent);
    });
  }

  componentWillUnmount() {
    this._matchMediaQueries.forEach(matchMediaQuery => {
      matchMediaQuery.removeListener(this._handleMediaQueryEvent);
    });
  }

  render() {
    return <Grid {...this._mergeStateToProps()} />
  }

  _handleMediaQueryEvent = (event) => {
    if (!event.matches) {
      return;
    }

    const mediaQuery = this._queries.find((mediaQuery) => mediaQuery.query === event.media);
    this.setState(mediaQuery.props);
  }

  _mergeStateToProps = () => (
    Object.assign({}, this.props, this.state)
  );
}

export default ResponsiveGrid;