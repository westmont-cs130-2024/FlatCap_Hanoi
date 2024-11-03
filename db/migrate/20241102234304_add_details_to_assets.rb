# db/migrate/20241102234304_add_details_to_assets.rb
class AddDetailsToAssets < ActiveRecord::Migration[7.0]
  def change
    # Add columns only if they don't already exist in the table
    add_column :assets, :acquisition_date, :date unless column_exists?(:assets, :acquisition_date)
    add_column :assets, :location, :string unless column_exists?(:assets, :location)

    # The following columns already exist, so we omit them to avoid errors:
    # add_column :assets, :name, :string
    # add_column :assets, :description, :text
    # add_column :assets, :category, :string
    # add_column :assets, :status, :integer
  end
end
