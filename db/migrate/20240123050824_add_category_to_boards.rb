class AddCategoryToBoards < ActiveRecord::Migration[7.0]
  def change
    add_reference :boards, :category, foreign_key: true
  end
end
