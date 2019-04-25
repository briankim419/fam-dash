class Api::V1::MessagesController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	before_action :authenticate_user!, except: [:show]

  def show
    message = Chat.find(params[:id]).messages
    render json: message
  end
end
