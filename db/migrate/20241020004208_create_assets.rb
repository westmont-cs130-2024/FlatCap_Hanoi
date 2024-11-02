class CreateAssets < ActiveRecord::Migration[7.2]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :description
      t.string :category

      t.timestamps
    end
  end
end
