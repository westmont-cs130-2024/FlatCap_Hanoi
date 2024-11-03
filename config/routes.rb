Rails.application.routes.draw do
  # Set the root path to home#index, which will render the home page
  root "home#index"

  # Route for the assets page
  get "/assets", to: "assets#index"

  # Define other routes as needed
end