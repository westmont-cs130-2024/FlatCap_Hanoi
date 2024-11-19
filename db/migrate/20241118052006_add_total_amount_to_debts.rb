class AddTotalAmountToDebts < ActiveRecord::Migration[7.2]
  def change
    add_column :debts, :total_amount, :float
  end
end
