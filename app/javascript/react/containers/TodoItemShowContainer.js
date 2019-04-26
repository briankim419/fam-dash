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
    const closeIcon = require('../../../../app/assets/images/close-icon-1.png');
    const checkIcon = require('../../../../app/assets/images/check.png');
    var todoClass = this.props.item.complete_status ? "done" : "undone";
    return(
      <div className={todoClass}>
        <img src={checkIcon} onClick={this.onClickDone} className="todo-check"/>
        <div className="todo-text" onClick={this.onClickDone}>
          {this.props.item.todotext}
        </div>
        <img src={closeIcon} onClick={this.onClickClose} className="todo-close"/>
      </div>
    );
  }
}

export default TodoItemShowContainer;
