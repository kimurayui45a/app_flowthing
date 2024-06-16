class AddSpaceSizeToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :space_size, :integer
  end
end
