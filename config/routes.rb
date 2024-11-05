Rails.application.routes.draw do

  # API routes for the React frontend
  namespace :api do
    namespace :v1 do
      resources :assets, only: [:index, :create, :show, :update, :destroy] do
        member do
          patch :update_status  # API route for updating the asset's status
        end
      end

      # Routes for debts
      resources :debts, only: [:index, :create, :show, :update, :destroy]
    end
  end

  # Web routes for your existing Rails views
  resources :assets, only: [:index, :create, :destroy] do
    member do
      patch :update_status  # Web route for updating the asset's status
    end
  end

  root "home#index"
  get "/assets", to: "assets#index"
end
