class Board < ApplicationRecord
  validates :board_title, presence: true, length: { maximum: 50 }
  validates :board_text, presence: true, length: { maximum: 50_000 }

  belongs_to :profile
  belongs_to :category, optional: true
  has_many :comments
  belongs_to :item, optional: true
  acts_as_paranoid

  def self.ransackable_attributes(auth_object = nil)
    ["board_text", "board_title", "category_id", "comments_count", "created_at", "deleted_at", "id", "item_id", "profile_id", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["category", "comments", "item", "profile"]
  end

end
