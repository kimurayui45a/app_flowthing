class AddProfileTextToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :profile_text, :text
  end
end
