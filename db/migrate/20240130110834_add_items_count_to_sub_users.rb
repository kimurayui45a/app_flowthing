class AddItemsCountToSubUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :sub_users, :items_count, :integer, default: 0
  end
end
