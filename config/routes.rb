Rails.application.routes.draw do
  # API routes for the React frontend
  namespace :api do
    namespace :v1 do
      resources :assets, only: [:index, :create, :show, :update, :destroy] do
        member do
          patch :update_status  # API route for updating the asset's status
        end
      end
    end
  end

  # Web routes for your existing Rails views
  resources :assets, only: [:index, :create, :destroy] do
    member do
      patch :update_status  # Web route for updating the asset's status
    end
  end

  root "assets#index"
end
