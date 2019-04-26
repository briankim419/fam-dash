class FamiliesController < ApplicationController
  def index
    @family = Family.all
  end

  # GET /Familys/1
  def show
    @family = Family.find_by_id(params[:id])
    render action: 'show'
  end

  def show
    if Family.find_by_id(params[:id]) != nil && Family.find(params[:id]).users.include?(current_user)
      @family = Family.find(params[:id])
      render action: 'show'
    else
      render json: "You are not authorized to view this group posts."
    end
  end

  # GET /Familys/new
  def new
    @family = Family.new
  end

  # POST /Familys
  def create
    @family = Family.new(family_params)
    if @family.save
      Membership.create(family_id: @family.id, user_id: current_user.id)
      Chat.create(family_id: @family.id)
    end
    redirect_back(fallback_location: authenticated_root_path)
  end

  private

  def family_params
    params.require(:family).permit(:family_name)
  end
end
