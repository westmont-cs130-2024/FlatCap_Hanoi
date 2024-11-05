class AddConstraintsAndUniquenessToUsers < ActiveRecord::Migration[7.2]
  def change
    # Update existing records with default values if they are NULL
    User.where(first_name: nil).update_all(first_name: "DefaultFirstName")
    User.where(last_name: nil).update_all(last_name: "DefaultLastName")
    User.where(password: nil).update_all(password: "TemporaryPassword")

    # Now add NOT NULL constraints and unique index
    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    change_column_null :users, :email, false
    change_column_null :users, :password, false
    add_index :users, :email, unique: true
  end
end
