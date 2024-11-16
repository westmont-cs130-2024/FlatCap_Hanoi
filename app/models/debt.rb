# app/models/debt.rb
class Debt < ApplicationRecord
  belongs_to :user

  # Validations for required fields
  validates :name, presence: true
  validates :amount_outstanding, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :amount_paid, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :category, presence: true
  validates :status, presence: true

  # Add any additional methods or scopes as needed
end