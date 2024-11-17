class AddStatusAndValueToAssets < ActiveRecord::Migration[7.2]
  def change
    add_column :assets, :inventoried, :boolean, default: false
    add_column :assets, :valued, :boolean, default: false
    add_column :assets, :marshalled, :boolean, default: false
    add_column :assets, :administered, :boolean, default: false
    add_column :assets, :value, :integer
  end
end
