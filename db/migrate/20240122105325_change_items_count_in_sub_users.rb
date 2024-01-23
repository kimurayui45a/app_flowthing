class ChangeItemsCountInSubUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :sub_users, :items_count, false
  end
end
