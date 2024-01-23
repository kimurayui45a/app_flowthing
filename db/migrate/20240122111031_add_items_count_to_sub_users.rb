class AddItemsCountToSubUsers < ActiveRecord::Migration[7.0]
  def self.up
    add_column :sub_users, :items_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :sub_users, :items_count
  end
end
