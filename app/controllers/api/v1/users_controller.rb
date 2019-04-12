class Api::V1::UsersController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	before_action :authenticate_user!

	def index
		render json: {users: User.all, current_user_id: current_user.id}
	end

	def show
		render json: User.find(params[:id])
	end

	def create
		follow = Follow.new
		follow.followed = User.find(followed_params)
		follow.follower = current_user
		if follow.followed != follow.follower
			follow.save
			user = User.find(followed_params)
			render json: {followed: user.followeds, followers: user.followers}
		end
	end

	def search
		query = "%#{params[:query]}%"
		user = User.where('first_name ilike ? or last_name ilike ? or email ilike ?', query, query, query)
	end

	def destroy
		follow = Follow.find_by(follower: current_user, followed: User.find(delete_params))
		follow.destroy
    group = Group.find(delete_params)
		user = User.find(delete_params)
		render json: {followed: user.followeds, followers: user.followers}
	end

	private
	def serialize_array(data, serializer)
		ActiveModel::Serializer::CollectionSerializer.new(data, each_serializer: serializer)
	end

	def followed_params
		params.require(:followedId)
	end

	def delete_params
		params.require(:id)
	end

	def authorize_user
		if !user_signed_in?
			raise ActionController::RoutingError.new("User is not signed in")
		end
	end
end
