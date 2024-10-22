# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Asset.create!(
  name: "Main House",
  description: "Address: 555 No Way, Santa Barbara, CA 93108",
  asset_type: "property"
)

Asset.create!(
  name: "Rental Unit - Kauai",
  description: "Address: 555 Surf Way Apt 2, Kihei, HI",
  asset_type: "property"
)

Asset.create!(
  name: "Honda Pilot",
  description: "2020 white – like new",
  asset_type: "automobile"
)
