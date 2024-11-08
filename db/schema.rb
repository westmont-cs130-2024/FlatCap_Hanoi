# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_11_04_235227) do
  create_table "assets", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status"
    t.date "acquisition_date"
    t.string "location"
    t.integer "user_id"
    t.index ["user_id"], name: "index_assets_on_user_id"
  end

  create_table "debts", force: :cascade do |t|
    t.string "name"
    t.float "amount_outstanding"
    t.float "amount_paid"
    t.string "category"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "phone_number"
    t.string "password", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "assets", "users"
end
