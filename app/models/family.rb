class Family < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships

  has_many :invites, inverse_of: :families
  has_one :chat
  has_many :posts
  has_many :todoitems

end
