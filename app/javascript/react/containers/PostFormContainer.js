import React from 'react'
import { Router, Route, Switch, browserHistory } from 'react-router';
import ReactDropzone from 'react-dropzone';
import Dropzone from 'react-dropzone';


class PostFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      errors: {},
      file: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.sendPost = this.sendPost.bind(this);
}

  validateBody(selection) {
    if (selection.trim() === '') {
      let newError = { body: 'The post can not be blank.' }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.body
      this.setState({ errors: errorState })
      return true
    }
  }

  sendPost(body){
    this.props.addNewPost({body: body, post_photo: this.state.file })
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleClearForm(){
    this.setState({
      body: '',
      errors: '',
      file: []
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.validateBody(this.state.body)) {
      let body = new FormData()
      body.append("body", this.state.body)
      let allFiles = this.state.file
      fetch(`/api/v1/families/${this.props.familyId}/posts`, {
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
        this.sendPost(body.post)
        this.handleClearForm()
        if(allFiles.length > 0){
          let i = allFiles.length - 1
          while (i >= 0){
            let photo_url_list = new FormData()
            photo_url_list.append("photo_url", allFiles[i])
            fetch(`/api/v1/families/${this.props.familyId}/photos`, {
              credentials: 'same-origin',
              method: 'POST',
              body: photo_url_list,
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
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`));
            i -= 1
          }
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }
  onDrop(file) {
    this.setState({ file: file })
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
      <form className="small-10-centered row devise post-form" onSubmit={this.handleSubmit}>
        <input className="post-text-box" name='body' type='text' value={this.state.body} onChange={this.handleChange} placeholder='What is on your mind?'/>
          <section className="small-4 small-centered columns row devise">
            <div>
              <Dropzone onDrop={this.onDrop}
                className="file-zone"
                multiple={true}>
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <aside>
              <p>Dropped files</p>
              <ul>
                {
                  this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
            </aside>
          </section>

        <input className="button comment-button" type="submit" value="Submit" />
      </form>
    );
  }
};

export default PostFormContainer;
