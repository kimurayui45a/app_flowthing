class Profile < ApplicationRecord
  validates :name, length: { maximum: 20 }
  validates :profile_text, length: { maximum: 2_000 }
  validate :image_icon_or_color_code_must_be_present

  belongs_to :user
  has_many :sub_users
  has_many :boards
  has_many :comments
  has_many :items, through: :sub_users

  has_many :spaces, dependent: :destroy
  has_many :composites, dependent: :destroy

  acts_as_paranoid

  mount_uploader :image_icon, ImageUploader

  private

  def image_icon_or_color_code_must_be_present
    if image_icon.blank? && color_code.blank?
      errors.add(:base, :image_icon_or_color_code_must_be_present)
    elsif image_icon.present? && color_code.present?
      errors.add(:base, :image_icon_and_color_code_cannot_be_present)
    end
  end
end
