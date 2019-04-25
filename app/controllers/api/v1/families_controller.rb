class Api::V1::FamiliesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
	before_action :authenticate_user!

  def index
    render json: User.find(current_user.id).families
  end

  def show
    family = Family.find(params[:id])
    if family && Family.find(params[:id]).users.include?(current_user)
      render json: family
    else
      render json: "You are not authorized to view this group posts."
    end
  end

	def create
	end

  private
  def family_params
    params.permit(:name)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("User is not signed in")
    end
  end

end
