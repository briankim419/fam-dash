class Api::V1::PhotosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def index
    render json: Photo.all
  end

  def show
    render json: Photo.find(params[:id])
  end

  def create
    photo = Photo.new(post_id: Post.last.id, photo_url: params[:photo_url])
    if photo.save
      render json: photo
    else
      render json: { error: photo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.permit(:photo_url, Post.last.id)
  end
end
