class Composite < ApplicationRecord
  belongs_to :profile
  belongs_to :space


  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "deleted_at", "id", "profile_id", "composite_name", "composite_text", "composite_space", "composite_item", "composite_image", "space_id"]
  end


  def self.ransackable_associations(auth_object = nil)
    ["profile", "space"]
  end

end
