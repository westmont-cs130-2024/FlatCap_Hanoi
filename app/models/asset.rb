# app/models/asset.rb
class Asset < ApplicationRecord
  belongs_to :user

  # Define enum for `status`
  enum :status, { inventory: 0, value: 1, marshal: 2, administer: 3 }

  CATEGORIES = ["Real Estate", "Vehicles", "Financial Accounts", "Personal Items", "Other"]

  # Validations for required fields
  validates :name, presence: true
  validates :category, presence: true, inclusion: { in: CATEGORIES }
  validates :location, presence: true
  validate :acquisition_date_is_valid_date

  # Callback to set default status
  after_initialize :set_default_status, if: :new_record?

  # Update status based on completed step
  def update_status(completed_step)
    self.status = case completed_step
                  when 'Inventory' then :inventory
                  when 'Value' then :value
                  when 'Marshal' then :marshal
                  when 'Administer' then :administer
                  else self.status # retain current status if step is unrecognized
                  end
    save
  end

  private

  # Ensure a valid acquisition date
  def acquisition_date_is_valid_date
    errors.add(:acquisition_date, "must be a valid date") if acquisition_date.present? && !acquisition_date.is_a?(Date)
  end

  # Set initial status to `inventory` by default
  def set_default_status
    self.status ||= :inventory
  end
end
