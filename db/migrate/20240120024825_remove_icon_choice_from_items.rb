class RemoveIconChoiceFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :icon_choice, :string
  end
end
