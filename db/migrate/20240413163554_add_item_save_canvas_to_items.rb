class AddItemSaveCanvasToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :item_save_canvas, :jsonb
  end
end
