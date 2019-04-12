import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import CommentFormContainer from '../containers/CommentFormContainer';
import CommentTile from '../components/CommentTile';
import Lightbox from 'react-images';
import Gallery from 'react-grid-gallery';

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
    this.addNewComment = this.addNewComment.bind(this);

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
          if(body.comments == undefined ){
          this.setState({ comments:body });
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }
  addNewComment(commentPayload) {
     let newComments = this.state.comments.concat(commentPayload)
     this.setState({ comments: newComments })
   }
  render(){
    const photos = []
    let fixData = this.props.photos.map(photo => {
      let temp
      if(photo.photo_url.url){
        temp = {src: photo.photo_url.url, thumbnail: photo.photo_url.url, thumbnailWidth: 500, thumbnailHeight: 500}
      }
      else{
        temp = {src: photo.preview, thumbnail: photo.preview, thumbnailWidth: 500, thumbnailHeight: 500}
      }
      photos.push(temp)
    })
    let all_comments
    if(this.state.comments.length > 0){
     all_comments = this.state.comments.map(comment => {
        return(
          <CommentTile
            key={comment.id}
            id={comment.id}
            text={comment.text}
          />
        )
      });
    };
    return(
      <div>
        <div>
          <h3>{this.props.body}</h3>
        </div>
        <Gallery
          images={photos}
          enableImageSelection={false}
        />
        <div>
          {all_comments}
        </div>
        <CommentFormContainer
          key={this.props.id}
          id={this.props.id}
          addNewComment={this.addNewComment}
        />
      </div>
    );
  }
};

export default PostContainer
