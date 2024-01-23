class Item < ApplicationRecord
  validate :validate_item_presence
  validates :item_text, length: { maximum: 10_000 }
  validates :item_name, length: { maximum: 50 }

  belongs_to :sub_user
  counter_culture :sub_user
  has_many :drafts, dependent: :destroy

  mount_uploader :item_image, ImageUploader

  private

  def validate_item_presence
    unless item_image.present? || item_canvas.present? || item_name.present?
      errors.add(:base, :item_must_be_present)
    end
  end
end
