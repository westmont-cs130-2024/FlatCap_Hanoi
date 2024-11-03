Rails.application.routes.draw do
  resources :assets, only: [:index, :create, :destroy]
  root "assets#index"
end
