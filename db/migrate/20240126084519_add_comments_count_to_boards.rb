class AddCommentsCountToBoards < ActiveRecord::Migration[7.0]
  def change
    add_column :boards, :comments_count, :integer, default: 0, null: false
  end
end
