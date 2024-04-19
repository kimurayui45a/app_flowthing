class Space < ApplicationRecord
  belongs_to :profile
  has_many :composites, dependent: :destroy


end
