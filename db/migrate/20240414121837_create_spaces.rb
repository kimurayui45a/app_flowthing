class CreateSpaces < ActiveRecord::Migration[7.0]
  def change
    create_table :spaces do |t|
      t.string :space_name
      t.text :space_text
      t.jsonb :space_canvas
      t.jsonb :space_save_canvas
      t.references :profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
