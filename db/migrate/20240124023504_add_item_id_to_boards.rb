class AddItemIdToBoards < ActiveRecord::Migration[7.0]
  def change
    add_column :boards, :item_id, :integer
    add_index :boards, :item_id
  end
end
