import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import CommentFormContainer from '../containers/CommentFormContainer';
import CommentTile from '../components/CommentTile';
import SmartGallery from 'react-smart-gallery';
import Lightbox from 'react-images';

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      comments: [],
      photoIndex: 0,
      isOpen: false
    };
    this.addNewComment = this.addNewComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.useLightbox = this.useLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
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

  useLightbox(src){
    let tempImages = []
    if (this.props.photos && this.props.photos.length > 0) {
      let fixData = this.props.photos.map(photo => {
        if(photo.photo_url){
          tempImages.push(photo.photo_url.url)
        }
      })
    }
    let index = tempImages.indexOf(src)
    this.setState({isOpen: true, photoIndex: index})
  }

  closeLightbox(){
    this.setState({isOpen: false, photoIndex: 0})
  }

  onClickPrev(){
    let currentIndex = this.state.photoIndex
    this.setState({photoIndex: currentIndex - 1})
  }

  onClickNext(){
    let currentIndex = this.state.photoIndex
    this.setState({photoIndex: currentIndex + 1})
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
    let showphotos
    const images = []
    if (this.props.photos && this.props.photos.length > 0) {
      let fixData = this.props.photos.map(photo => { 
        if(photo.photo_url){
          images.push(photo.photo_url.url)
        } else {
          images.push(photo.preview)
        }
      })
    }
    const lightImages = []
    if (this.props.photos && this.props.photos.length > 0) {
      let fixData = this.props.photos.map(photo => {
        if(photo.photo_url){
          lightImages.push({src: photo.photo_url.url})
        } else {
          lightImages.push({src: photo.preview})
        }
      })
    }
    if (images.length > 0) {
      showphotos =
      <div className="post-photo">
        <SmartGallery
          images={images}
          onImageSelect={(event, src) => this.useLightbox(src)}
        />
        <Lightbox
          images={lightImages}
          currentImage={this.state.photoIndex}
          backdropClosesModel={true}
          isOpen={this.state.isOpen}
          onClose={this.closeLightbox}
          onClickPrev={this.onClickPrev}
          onClickNext={this.onClickNext}
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

        <div className="comment-list">
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
