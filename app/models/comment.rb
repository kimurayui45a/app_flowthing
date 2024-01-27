class Comment < ApplicationRecord
  validates :comment_text, presence: true, length: { maximum: 30_000 }
  validates :comment_title, length: { maximum: 50 }

  belongs_to :board
  belongs_to :profile
  counter_culture :board
  acts_as_paranoid
end
