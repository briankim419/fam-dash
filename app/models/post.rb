class Post < ApplicationRecord
  has_many :comments
  has_many :photos
  
  validates :body ,presence: true
end
