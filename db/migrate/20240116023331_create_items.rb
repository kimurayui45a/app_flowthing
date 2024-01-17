class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :item_image
      t.jsonb :item_canvas
      t.string :item_name
      t.text :item_text
      t.string :icon_choice
      t.references :profile, null: false, foreign_key: true
      t.references :sub_user, null: false, foreign_key: true
      t.string :itemicon_choice

      t.timestamps
    end
  end
end
