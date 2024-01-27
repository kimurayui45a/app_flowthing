class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.string :board_title, null: false
      t.text :board_text, null: false
      t.references :sub_user, null: false, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :boards, :deleted_at
  end
end
