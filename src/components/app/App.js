import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

const App = (props) => (
  <div>
    <h1>
      <Link to="/">Reduxstagram</Link>
    </h1>
    {React.Children.map(props.children, (child) => React.cloneElement(child, props))}
  </div>
);

export default App;