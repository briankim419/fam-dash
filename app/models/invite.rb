class Invite < ApplicationRecord
  belongs_to :family, inverse_of: :invites
  belongs_to :sender, :class_name => 'User'
  belongs_to :recipient, :class_name => 'User', optional: true


  before_save :check_user_existence

 def check_user_existence
    recipient = User.find_by_email(email)
   if recipient
      self.recipient_id = recipient.id
   end
 end

 before_create :generate_token

 def generate_token
    self.token = Digest::SHA1.hexdigest([self.family_id, Time.now, rand].join)
 end
end
