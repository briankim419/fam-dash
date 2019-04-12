import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import PostIndexContainer from '../containers/PostIndexContainer';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={PostIndexContainer} />
    </Router>
  );
}


export default App
