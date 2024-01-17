class CreateEpisodes < ActiveRecord::Migration[7.0]
  def change
    create_table :episodes do |t|
      t.string :episode_image
      t.jsonb :episode_canvas
      t.string :episode_title, null: false
      t.text :episode_text
      t.references :profile, null: false, foreign_key: true
      t.references :sub_user, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
