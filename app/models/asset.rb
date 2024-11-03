# app/models/asset.rb
class Asset < ApplicationRecord
  belongs_to :user

  # Ensure only one enum definition exists for `status`
  enum :status, { inventory: 0, value: 1, marshal: 2, administer: 3 }

  CATEGORIES = ["Real Estate", "Vehicles", "Financial Accounts", "Personal Items", "Other"]

  validates :name, presence: true
  validates :category, presence: true, inclusion: { in: CATEGORIES }
  validates :location, presence: true
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validate :acquisition_date_is_valid_date

  private

  def acquisition_date_is_valid_date
    errors.add(:acquisition_date, "must be a valid date") if acquisition_date.present? && !acquisition_date.is_a?(Date)
  end
end
