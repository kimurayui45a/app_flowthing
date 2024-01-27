class AddProfileToBoards < ActiveRecord::Migration[7.0]
  def change
    add_reference :boards, :profile, null: false, foreign_key: true
    remove_column :boards, :sub_user_id, :integer
  end
end
