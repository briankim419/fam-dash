import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import PostIndexContainer from '../containers/PostIndexContainer';
import TodoItemIndexContainer from '../containers/TodoItemIndexContainer';
import FamilyIndexContainer from '../containers/FamilyIndexContainer';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/families' component={FamilyIndexContainer} />
      <Route path='/families/:id' component={PostIndexContainer} />
      <Route path= '/families/:family_id/todoitems' component={TodoItemIndexContainer} />
    </Router>
  );
}

export default App
