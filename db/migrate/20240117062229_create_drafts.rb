class CreateDrafts < ActiveRecord::Migration[7.0]
  def change
    create_table :drafts do |t|
      t.jsonb :canvas
      t.references :sub_user, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.references :episode, null: false, foreign_key: true
      t.integer :status
      t.string :episode_image
      t.string :sub_image
      t.string :item_image

      t.timestamps
    end
  end
end
