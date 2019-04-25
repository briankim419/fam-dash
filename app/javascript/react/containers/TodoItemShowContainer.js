import React, { Component } from 'react';

class TodoItemShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    this.props.removeItem(this.props.index);
  }
  onClickDone() {
    this.props.markTodoDone(this.props.index);
  }
  render() {
    const closeIcon = require('../../../../app/assets/images/close-icon.png');
    var todoClass = this.props.item.complete_status ? "done" : "undone";
    return(
      <div className={todoClass}>
         <i className="fi-check large" onClick={this.onClickDone}></i>
        <div className="todo-text" onClick={this.onClickDone}>
          {this.props.item.todotext}
        </div>
        <i className="fi-x large" onClick={this.onClickClose}></i>
      </div>
    );
  }
}

export default TodoItemShowContainer;
