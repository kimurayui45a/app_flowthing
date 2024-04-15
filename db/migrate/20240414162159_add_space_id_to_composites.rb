class AddSpaceIdToComposites < ActiveRecord::Migration[7.0]
  def change
    add_reference :composites, :space, null: false, foreign_key: true
  end
end
