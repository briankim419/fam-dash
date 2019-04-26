class InviteMailer < ApplicationMailer
  def new_user_invite(invite, url_link)
    @user = invite
    @sender_first_name = User.find_by_id(@user.sender_id).first_name
    @sender_last_name = User.find_by_id(@user.sender_id).last_name
    @family_name = Family.find_by_id(@user.family_id).family_name
    @invite_info = invite
    @token = url_link
    mail(
      to: @invite_info.email,
      subject: 'Welcome to Fam-Dash'
    )
  end

  def existing_user_invite(invite)
    @user = invite
    @sender = User.find_by_id(@user.sender_id).first_name
    @sender_first_name = User.find_by_id(@user.sender_id).first_name
    @sender_last_name = User.find_by_id(@user.sender_id).last_name
    @family_name = Family.find_by_id(@user.family_id).family_name
    mail(to: @user.recipient.email, subject: "#{@sender_first_name} #{@sender_last_name} has invited you to #{@family_name}")
  end

end
