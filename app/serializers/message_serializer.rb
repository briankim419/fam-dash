class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user, :body
end
