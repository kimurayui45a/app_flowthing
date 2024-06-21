class AddProfileCanvasAndProfileIconToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :profile_canvas, :jsonb
    add_column :profiles, :profile_icon, :boolean, default: false
  end
end
