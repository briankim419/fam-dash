class Api::V1::PostsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    render json: current_user
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    post = Post.new(post_params)

    if post.save
      render json: post
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:body, :photos, :comments, :family_id)
  end
end
