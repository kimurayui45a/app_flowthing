class SubUser < ApplicationRecord
  validates :icon_choice, presence: true
  validates :sub_name, length: { maximum: 20 }
  validates :sub_text, length: { maximum: 2_000 }

  belongs_to :profile
  has_many :items
  has_many :drafts

  acts_as_paranoid

  mount_uploader :sub_image, ImageUploader

  validate :validate_icon_presence

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "deleted_at", "icon_choice", "id", "items_count", "last_accessed_at", "profile_id", "sub_canvas", "sub_color", "sub_image", "sub_name", "sub_text", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["drafts", "items", "profile"]
  end
  
  private

  def validate_icon_presence
    case icon_choice
    when 'sub_image'
      errors.add(:sub_image, :sub_image_must_be_present) unless sub_image.present?
    when 'sub_canvas'
      errors.add(:sub_canvas, :sub_canvas_must_be_present) unless sub_canvas.present?
    when 'sub_color'
      errors.add(:sub_color, :sub_color_must_be_present) unless sub_color.present?
    end
  end
end
