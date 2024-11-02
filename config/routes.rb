Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "assets#index"
  get "/assets", to: "assets#index"

  # Defines the root path route ("/")
  # root "posts#index"
end
