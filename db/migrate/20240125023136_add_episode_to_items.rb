class AddEpisodeToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :episode, :text
  end
end
