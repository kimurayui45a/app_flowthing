class Space < ApplicationRecord
  belongs_to :profile
  has_many :composites, dependent: :destroy



  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "deleted_at", "id", "profile_id", "space_name", "space_text", "space_canvas", "space_save_canvas", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["profile"]
  end


end
