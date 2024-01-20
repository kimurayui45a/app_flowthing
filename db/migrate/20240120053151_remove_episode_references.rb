class RemoveEpisodeReferences < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :drafts, :episodes

    drop_table :episodes
  end
end
