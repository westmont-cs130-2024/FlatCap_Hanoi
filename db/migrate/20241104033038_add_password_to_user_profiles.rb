class AddPasswordToUserProfiles < ActiveRecord::Migration[7.2]
  def change
    add_column :user_profiles, :password, :string
  end
end
