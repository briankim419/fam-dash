import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';

class CommentFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
}

  validateBody(selection) {
    if (selection.trim() === '') {
      let newError = { text: 'The comment can not be blank.' }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.text
      this.setState({ errors: errorState })
      return true
    }
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleClearForm(){
    this.setState({
      text: '',
      errors: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.validateBody(this.state.text)) {
      this.props.addNewComment({text: this.state.text})
      let formPayload = new FormData()
      formPayload.append("text", this.state.text)
      this.handleClearForm()
      fetch(`/api/v1/posts/${this.props.id}/comments`, {
        credentials: 'same-origin',
        method: 'POST',
        body: formPayload,
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
        this.handleClearForm()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

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
      <form onSubmit={this.handleSubmit} className="post-text">
        <div className="comment-input">
          <input className="post-text" name='text' type='text' value={this.state.text} onChange={this.handleChange} />
        </div>
        <input className="button post-button" type="submit" value="Submit" />
        {errorDiv}
      </form>
    );
  }
};

export default CommentFormContainer;
