class User < ApplicationRecord
  has_one :profile, dependent: :destroy

  def profile_needs_completion?
    profile.nil? || profile.image_icon.blank? && profile.color_code.blank?
  end

  # ユーザーが論理削除されているかどうかを判定する
  def active_for_authentication?
    super && deleted_at.nil?
  end

  # 論理削除された場合のDeviseのメッセージ
  def inactive_message
    !deleted_at.nil? ? :deleted_account : super
  end

  acts_as_paranoid

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
end
