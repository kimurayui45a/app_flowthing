class Item < ApplicationRecord
  validate :validate_item_presence
  validates :item_text, length: { maximum: 10_000 }
  validates :item_name, length: { maximum: 20 }
  validates :episode, presence: true, length: { maximum: 50_000 }

  belongs_to :sub_user
  counter_culture :sub_user
  has_many :drafts
  has_many :boards

  mount_uploader :item_image, ImageUploader

  acts_as_paranoid

  def self.ransackable_associations(auth_object = nil)
    ["boards", "drafts", "item_boards", "sub_user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "image_choice", "item_canvas", "item_image", "item_name", "item_text", "sub_user_id", "updated_at", "episode", "item_place"]
  end

  private

  def validate_item_presence
    unless item_image.present? || item_canvas.present? || item_name.present?
      errors.add(:base, :item_must_be_present)
    end
  end

end
