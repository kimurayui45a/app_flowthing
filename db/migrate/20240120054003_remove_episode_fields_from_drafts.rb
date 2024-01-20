class RemoveEpisodeFieldsFromDrafts < ActiveRecord::Migration[7.0]
  def change
    remove_column :drafts, :episode_id, :bigint
    remove_column :drafts, :episode_image, :string
  end
end
