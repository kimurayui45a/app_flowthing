class Draft < ApplicationRecord
  belongs_to :sub_user
  belongs_to :item

  mount_uploader :sub_image, ImageUploader
  mount_uploader :item_image, ImageUploader

  validate :validate_associations, if: :completed?

  def completed?
    status == 'completed'
  end

  private

  def validate_associations
    errors.add(:sub_user, :sub_user_invalid) unless sub_user.valid?

    errors.add(:item, :item_invalid) unless item.valid?
  end
end
