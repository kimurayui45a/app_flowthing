class AddSelectedOptionToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :selected_option, :string
  end
end
