class AddCompletionTimestampsToAssets < ActiveRecord::Migration[7.2]
  def change
    add_column :assets, :inventoried_at, :datetime
    add_column :assets, :valued_at, :datetime
    add_column :assets, :marshalled_at, :datetime
    add_column :assets, :administered_at, :datetime
  end
end