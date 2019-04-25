class ChatsController < ApplicationController
  def index
    render action: 'index'
  end
  def show
    render action: 'show'
  end
end
