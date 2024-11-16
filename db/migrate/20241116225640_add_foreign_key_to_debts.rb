class AddForeignKeyToDebts < ActiveRecord::Migration[7.2]
  def change
    add_foreign_key :debts, :users
  end
end
