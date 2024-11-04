class MakeUserIdOptionalInAssets < ActiveRecord::Migration[7.0]
  def change
    change_column_null :assets, :user_id, true
  end
end
