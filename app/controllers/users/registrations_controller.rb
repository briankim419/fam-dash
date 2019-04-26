class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]


  def new
    @token = params[:invite_token]
    super
  end


  def create
    @newUser = User.new(user_params)
    @token = params[:invite_token]
    if @token != nil
        @newUser.save
       org =  Invite.find_by_token(@token)
       Membership.create(family_id: org.family_id, user_id: @newUser.id)
       redirect_back(fallback_location: root_path)
    else
      super
    end
  end


  def edit
    super
  end


  def update
    super
  end

  def destroy
    super
  end

  def cancel
    super
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  protected


  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  end


  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  end

  def after_sign_up_path_for(resource)
    super(resource)
  end


  def after_inactive_sign_up_path_for(resource)
    super(resource)
  end
end
