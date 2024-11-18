class CreateBeneficiaries < ActiveRecord::Migration[7.2]
  def change
    create_table :beneficiaries do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.text :notes
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    create_join_table :assets, :beneficiaries do |t|
      t.index :asset_id
      t.index :beneficiary_id
    end
  end
end
