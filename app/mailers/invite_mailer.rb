class InviteMailer < ApplicationMailer
  def new_user_invite(invite, url_link)
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
    @family_name = Family.find_by_id(@user.family_id).family_name
    mail(to: @user.recipient.email, subject: "#{@sender} has invited you to #{@family_name}")
  end

end
