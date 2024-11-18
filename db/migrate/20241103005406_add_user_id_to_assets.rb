class AddUserIdToAssets < ActiveRecord::Migration[7.2]
  def change
    # Add `user_id` column without the `NOT NULL` constraint initially
    add_reference :assets, :user, foreign_key: true

    # Backfill `user_id` with the placeholder user for existing records
    reversible do |dir|
      dir.up do
        placeholder_user = User.find_or_create_by(first_name: 'Placeholder User', last_name: 'Last',
                                                  email: 'placeholder@example.com')
        Asset.where(user_id: nil).update_all(user_id: placeholder_user.id)
      end
    end

    # Change `user_id` to `NOT NULL` constraint after backfilling
    change_column_null :assets, :user_id, false
  end
end
