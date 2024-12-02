Rails.application.routes.draw do
  # API routes for the React frontend
  namespace :api do
    namespace :v1 do
      get 'current_user', to: 'users#current_user'

      resources :assets, only: [:index, :create, :show, :update, :destroy] do
        member do
          patch :update_status  # API route for updating the asset's status
          post :add_beneficiaries
        end
      end

      # Routes for debts
      resources :debts, only: [:index, :create, :show, :update, :destroy] do
        collection do
          get 'total_liabilities'  # Custom route for total liabilities
        end
      end

      # Routes for documents
      resources :documents, only: [:index, :create, :destroy]

      # Routes for beneficiaries
      resources :beneficiaries, only: [:index, :create, :show, :update, :destroy]

      # User registration and sign-in routes
      resources :users, only: [:create]
      post 'users/sign_in', to: 'users#sign_in'
    end
  end

  # Web route for root
  root "home#index"
  get "/assets", to: "assets#index"
end
