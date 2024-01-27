class AddIndexToProfileIdInComments < ActiveRecord::Migration[7.0]
  def change
    add_index :comments, :profile_id
  end
end
