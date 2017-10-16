import React from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

const App = (props) => (
  <MuiThemeProvider>
    <div>
      <h1>
        <Link to="/">Reduxstagram</Link>
      </h1>
      {React.Children.map(props.children, (child) => React.cloneElement(child, props))}
    </div>
  </MuiThemeProvider>
);

export default App;