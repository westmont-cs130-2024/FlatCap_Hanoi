class AddStatusToAssets < ActiveRecord::Migration[7.2]
  def change
    add_column :assets, :status, :integer
  end
end
