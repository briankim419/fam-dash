import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import CommentFormContainer from '../containers/CommentFormContainer';
import CommentTile from '../components/CommentTile';
import Gallery from 'react-grid-gallery';
import SmartGallery from 'react-smart-gallery';
import FbImageLibrary from 'react-fb-image-grid'

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      photoIndex: 0,
      isOpen: false
    };
    this.addNewComment = this.addNewComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if(this.props.id != undefined){
      fetch(`/api/v1/posts/${this.props.id}/comments`)
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
          if(body.comments.length > 0 ){
          this.setState({ comments:body.comments });
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }
  addNewComment(commentPayload) {
     let newComments = this.state.comments.concat(commentPayload)
     this.setState({ comments: newComments })
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
  render(){
    const photos = []
    if (this.props.photos && this.props.photos.length > 0) {
      let fixData = this.props.photos.map(photo => {
        let temp
        if(photo.photo_url){
          temp = {src: photo.photo_url.url, thumbnail: photo.photo_url.url, thumbnailWidth: 500, thumbnailHeight: 500}
        }
        else{
          temp = {src: photo.preview, thumbnail: photo.preview, thumbnailWidth: 500, thumbnailHeight: 500}
        }
        photos.push(temp)
      })
    }
    let showphotos
    const images = []
    if (this.props.photos && this.props.photos.length > 0) {
      let fixData = this.props.photos.map(photo => {
        if(photo.photo_url){
          images.push(photo.photo_url.url)
        }
      })
    }
    if (photos.length > 0) {
      showphotos =
      <div className="post-photo">
        <Gallery
          images={photos}
          enableImageSelection={false}
        />
      </div>
    }
    let all_comments
    if(this.state.comments.length > 0){
     all_comments = this.state.comments.map(comment => {
        return(
          <CommentTile
            key={comment.id}
            id={comment.id}
            text={comment.text}
            firstName={comment.user.first_name}
          />
        )
      });
    };
    return(
      <div className="small-10-centered row devise post-show">
        <div className="text-justify post-body">
          <h3 className="post">{this.props.body}</h3>
        </div>
          {showphotos}

        <div>
          {all_comments}
        </div>
        <CommentFormContainer
          key={this.props.id}
          id={this.props.id}
          addNewComment={this.addNewComment}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
};

export default PostContainer
