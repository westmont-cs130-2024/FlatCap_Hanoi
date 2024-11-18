class Beneficiary < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :assets

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :notes, length: { maximum: 500, allow_blank: true }
end
