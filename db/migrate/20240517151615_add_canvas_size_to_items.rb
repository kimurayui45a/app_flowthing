class AddCanvasSizeToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :canvas_size, :jsonb
  end
end
