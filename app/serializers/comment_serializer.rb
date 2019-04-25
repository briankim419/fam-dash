class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user, :text
end
