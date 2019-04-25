class Todoitem < ApplicationRecord
  belongs_to :family
  validates :todotext ,presence: true
end
