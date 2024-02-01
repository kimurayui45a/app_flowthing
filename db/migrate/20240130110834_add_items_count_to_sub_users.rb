class AddItemsCountToSubUsers < ActiveRecord::Migration[7.0]
  def change
    unless column_exists?(:sub_users, :items_count)
      add_column :sub_users, :items_count, :integer, default: 0
    end
  end
end
