class InvitesController < ApplicationController
  def new
    @invite = Invite.new # Make a new Invite
    @family_list = []
    current_user.family_ids.each do |family_id|
      @family_list.push(Family.find(family_id))
    end
    render :new
  end

  def create
    @invite = Invite.new(invite_params)
    @invite.sender_id = current_user.id
    if @invite.save
      #if the user already exists
      if @invite.recipient != nil
         #send a notification email
         InviteMailer.existing_user_invite(@invite).deliver
         Membership.create(family_id: @invite.family_id, user_id: @invite.recipient_id)
      else
         InviteMailer.new_user_invite(@invite, new_user_registration_path(:invite_token => @invite.token)).deliver
      end
    end
    redirect_back(fallback_location: authenticated_root_path)
  end


  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def invite_params
    params.require(:invite).permit(:email, :family_id, :families)
  end
end
