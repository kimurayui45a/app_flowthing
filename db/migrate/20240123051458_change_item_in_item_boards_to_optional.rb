class ChangeItemInItemBoardsToOptional < ActiveRecord::Migration[7.0]
  def change
    change_column_null :item_boards, :item_id, true
  end
end
