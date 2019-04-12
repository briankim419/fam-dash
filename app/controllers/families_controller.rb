class FamiliesController < ApplicationController
  def index
    @Family = Family.all
  end

  # GET /Familys/1
  def show
    @Family = Family.find(params[:id])
  end

  # GET /Familys/new
  def new
    binding.pry
    @Family = Family.new
  end

  # POST /Familys
  def create
    @family = Family.new
    binding.pry
    if @family.save
      flash[:notice] = 'Family was successfully created.'
      redirect_to @family
    else
      render action: 'new'
    end
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def article_params
    params.require(:article).permit(:title, :description, :url, :submitter)
  end
end
