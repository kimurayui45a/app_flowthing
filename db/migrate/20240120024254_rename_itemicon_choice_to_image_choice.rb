class RenameItemiconChoiceToImageChoice < ActiveRecord::Migration[7.0]
  def change
    rename_column :items, :itemicon_choice, :image_choice
  end
end
