class Api::V1::CommentsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    comments = Post.find(params[:post_id]).comments
    render json: comments
  end

  def create
    comment = Comment.new(text: params[:text], post_id: params[:post_id], user_id: current_user.id)
    if comment.save
      render json: comment
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.permit(:text, :post_id, :currentuser)
  end
end
