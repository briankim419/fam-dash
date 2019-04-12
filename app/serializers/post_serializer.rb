class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :comments, :photos
end
