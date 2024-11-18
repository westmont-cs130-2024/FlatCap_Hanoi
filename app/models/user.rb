# app/models/user.rb
class User < ApplicationRecord
  has_many :assets, dependent: :destroy
  has_many :documents, dependent: :destroy
  has_many :debts, dependent: :destroy
  has_many :beneficiaries, dependent: :destroy

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone_number, presence: true
  validates :password, presence: true
end
