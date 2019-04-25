class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user, :text, :post_id
end
