class RemoveItemsCountFromSubUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :sub_users, :items_count, :integer
  end
end
