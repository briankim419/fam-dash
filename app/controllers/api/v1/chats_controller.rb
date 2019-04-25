class Api::V1::ChatsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
	before_action :authenticate_user!

  def index
    family = Family.find(params[:family_id])
    if Family.find(params[:family_id]).users.include?(current_user)
      chat = Chat.find(params[:family_id])
      render json: family && current_user
    else
      render json: "You are not authorized to view this chat."
    end
  end

  def show
    family = Family.find(params[:id])
    if Family.find(params[:id]).users.include?(current_user)
      render json: family.posts
    else
      render json: "You are not authorized to view this chat."
    end
  end

	def create
	end

  private
  def chat_params
    params.permit(:family_id)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

end
