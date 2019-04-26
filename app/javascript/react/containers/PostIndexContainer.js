import React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import PostContainer from '../containers/PostContainer';
import PostFormContainer from '../containers/PostFormContainer';
import ChatContainer from '../containers/ChatContainer';
import TodoItemIndexContainer from '../containers/TodoItemIndexContainer'
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';

class PostIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      chatShow: false,
      todoShow: false,
      familyName: ''
    };
    this.addNewPost = this.addNewPost.bind(this);
    this.clickChat = this.clickChat.bind(this);
    this.clickTodo = this.clickTodo.bind(this);
  }
  componentDidMount() {
    fetch(`/api/v1/families/${this.props.params.id}`)
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
        let temp = this.state.posts
        temp = body.family.posts.reverse()
        this.setState({posts:temp, familyName: body.family.family_name});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewPost(postPayload) {
    let newPosts
    let fixPayload
    if(postPayload.post_photo != undefined){
      fixPayload = {body: postPayload.body, photos: postPayload.post_photo}
      let temp = this.state.posts
      temp.unshift(fixPayload)
      this.setState({ posts: temp })
    } else {
      fixPayload = {body: postPayload.body, photos: ""}
      let temp = this.state.posts
      temp.unshift(fixPayload)
      this.setState({ posts: temp })
    }
  }
  clickChat(){
    let temp = this.state.chatShow
    temp = !temp
    this.setState({chatShow: temp})
  }

  clickTodo(){
    let temp = this.state.todoShow
    temp = !temp
    this.setState({todoShow: temp})
  }

  render(){
    const chatLogo = require('../../../../app/assets/images/chatIcon2.png');
    const todoLogo = require('../../../../app/assets/images/todoIcon2.png');
    const closeIcon = require('../../../../app/assets/images/close-icon-2.png');

    let chatPopup
    let todoPopup


    if(this.state.todoShow) {
      todoPopup =
        <TodoItemIndexContainer
          familyId={this.props.params.id}
          clickTodo={this.clickTodo}
          familyName={this.state.familyName}
        />
    } else {
      todoPopup = <img src={todoLogo} onClick={this.clickTodo} className="todo-logo"/>
    }
    if(this.state.chatShow) {
      chatPopup =
        <div className="chat-box">
          <div className="chat-header">
            <h4 className="chat-title">{this.state.familyName} chat</h4>
            <img src={closeIcon} className="close-chat" onClick={this.onClickDone} onClick={this.clickChat} />
          </div>
        <ChatContainer
          id={this.props.params.id}
          />
        </div>
    } else {
      chatPopup = <img src={chatLogo} onClick={this.clickChat} className="chat-logo"/>
    }
    let postx = this.state.posts
    let all_posts = postx.map(post => {
      return(
        <PostContainer
          key={post.id}
          id={post.id}
          body={post.body}
          familyId={this.props.params.id}
          photos={post.photos}
        />
      )
    });
    return(
      <div className="post-index-container">
        <h2 className="family-name">Welcome to {this.state.familyName} dashboard!</h2>
        <PostFormContainer
          addNewPost={this.addNewPost}
          familyId={this.props.params.id}
        />
        {all_posts}
        {chatPopup}
        {todoPopup}
      </div>
    );
  }
};

export default PostIndexContainer
