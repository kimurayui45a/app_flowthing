class DropItemBoards < ActiveRecord::Migration[7.0]
  def up
    drop_table :item_boards
  end

  def down
    create_table :item_boards do |t|
      t.bigint :item_id
      t.bigint :board_id, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index :board_id, name: "index_item_boards_on_board_id"
      t.index :item_id, name: "index_item_boards_on_item_id"
    end
  end
end
