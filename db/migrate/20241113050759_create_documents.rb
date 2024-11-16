class CreateDocuments < ActiveRecord::Migration[7.2]
  def change
    create_table :documents do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true, index: true # adds an index on user_id
      t.timestamps
    end
  end
end
