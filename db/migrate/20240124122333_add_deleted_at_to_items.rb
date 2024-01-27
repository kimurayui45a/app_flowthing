class AddDeletedAtToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :deleted_at, :datetime
    add_index :items, :deleted_at
    add_column :comments, :deleted_at, :datetime
    add_index :comments, :deleted_at
    add_column :profiles, :deleted_at, :datetime
    add_index :profiles, :deleted_at
  end
end
