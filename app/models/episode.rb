class Episode < ApplicationRecord
  validates :episode_title, presence: true, length: { maximum: 50 }
  validates :episode_text, length: { maximum: 56_000 }

  belongs_to :profile
  belongs_to :sub_user
  belongs_to :item

  mount_uploader :episode_image, ImageUploader
end
