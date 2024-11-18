class CreateDebts < ActiveRecord::Migration[7.0]
  def change
    create_table :debts do |t|
      t.string :name
      t.float :total_amount
      t.float :amount_paid
      t.string :category
      t.boolean :status, default: false

      t.timestamps
    end
  end
end
