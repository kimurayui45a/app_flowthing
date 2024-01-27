class AddDeletedAtToSubUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :sub_users, :deleted_at, :datetime
    add_index :sub_users, :deleted_at
  end
end
