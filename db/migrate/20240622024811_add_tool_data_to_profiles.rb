class AddToolDataToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :tool_data, :jsonb
  end
end
