class FamilySerializer < ActiveModel::Serializer
  attributes :id, :family_name, :posts, :users
  has_many :posts
end
