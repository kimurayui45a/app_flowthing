class RemoveProfileIdFromItemsAndEpisodes < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :profile_id
    remove_column :episodes, :profile_id
  end
end
