import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router';

class TodoFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(selection) {
    if (selection.trim() === '') {
      let newError = { body: 'Todo can not be blank.' }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.body
      this.setState({ errors: errorState })
      return true
    }
  };

  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    if (this.validateForm(newItemValue)) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  };

  render() {
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<p key={error}>{error}</p>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="Add a new todo"/>
        <button type="submit" className="todo-submit">Add</button>
      </form>
    );
  }
};

export default TodoFormContainer;
