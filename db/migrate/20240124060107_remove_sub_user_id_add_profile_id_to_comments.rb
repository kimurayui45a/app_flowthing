class RemoveSubUserIdAddProfileIdToComments < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :sub_user_id, :integer
    add_column :comments, :profile_id, :integer, null: false
  end
end
