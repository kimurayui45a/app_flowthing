class CreateComposites < ActiveRecord::Migration[7.0]
  def change
    create_table :composites do |t|
      t.string :composite_name
      t.text :composite_text
      t.jsonb :composite_space
      t.jsonb :composite_item
      t.references :profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
