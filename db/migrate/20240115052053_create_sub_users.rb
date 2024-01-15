class CreateSubUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_users do |t|
      t.string :sub_image
      t.string :sub_color
      t.jsonb :sub_canvas
      t.string :sub_name
      t.text :sub_text
      t.string :icon_choice
      t.references :profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
