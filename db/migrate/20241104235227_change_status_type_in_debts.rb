class ChangeStatusTypeInDebts < ActiveRecord::Migration[7.2]
  def change
    change_column :debts, :status, :string
  end
end
