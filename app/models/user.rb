class User < ApplicationRecord
  has_one :profile, dependent: :destroy

  def profile_needs_completion?
    profile.nil? || profile.image_icon.blank? && profile.color_code.blank?
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
end
