import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import TodoItemShowContainer from '../containers/TodoItemShowContainer';
import TodoFormContainer from '../containers/TodoFormContainer';


class TodoItemIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: []
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
  }
  componentDidMount() {
    fetch(`/api/v1/families/${this.props.familyId}/todoitems`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({todoItems: body});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addItem(todoItem) {

    let body = new FormData()
    body.append("todotext", todoItem.newItemValue)
    body.append("complete_status", false)
    fetch(`/api/v1/families/${this.props.familyId}/todoitems`, {
      credentials: 'same-origin',
      method: 'POST',
      body: body,
      headers: {
        'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ todoItems: body});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  removeItem (itemIndex) {
    let todo = this.state.todoItems[itemIndex]
    let temp = this.state.todoItems
    temp.splice(itemIndex, 1);
    this.setState({todoItems: temp});

    let body = new FormData()
    body.append("body", todo)
    fetch(`/api/v1/families/${this.props.familyId}/todoitems/${todo.id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: body,
      headers: {
        'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ posts: body});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  markTodoDone(itemIndex) {
    let temp = this.state.todoItems
    let todo = temp[itemIndex];
    temp.splice(itemIndex, 1);
    todo.complete_status = !todo.complete_status;
    todo.complete_status ? temp.push(todo) : temp.unshift(todo);
    this.setState({todoItems: temp});

    fetch(`/api/v1/families/${this.props.familyId}/todoitems/${todo.id}/edit`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      }
    )
  }

  render(){
    if(this.state.todoItems.length > 0){
      var allItems = this.state.todoItems.map((item, index) => {
        return(
          <TodoItemShowContainer
            key={item.id}
            item={item}
            index={index}
            removeItem={this.removeItem}
            markTodoDone={this.markTodoDone}
          />
        )
      })
    }
    return(
      <div className="todo-index-container">
        <div className="todo-header">
          <img className="close-chat" src="https://img.icons8.com/ios-glyphs/50/000000/cancel.png" onClick={this.props.clickTodo}/>
        </div>
        <div className="list-group">
         {allItems}
         <TodoFormContainer
           addItem={this.addItem}
         />
     </div>

      </div>
    );
  }
};

export default TodoItemIndexContainer
