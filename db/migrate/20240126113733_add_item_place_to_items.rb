class AddItemPlaceToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :item_place, :string
  end
end
