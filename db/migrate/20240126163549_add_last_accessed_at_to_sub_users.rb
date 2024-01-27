class AddLastAccessedAtToSubUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :sub_users, :last_accessed_at, :datetime
  end
end
