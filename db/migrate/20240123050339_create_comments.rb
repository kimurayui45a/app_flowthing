class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :board, null: false, foreign_key: true
      t.text :comment_text, null: false
      t.references :sub_user, null: false, foreign_key: true
      t.string :comment_title

      t.timestamps
    end
  end
end
