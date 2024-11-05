Rails.application.routes.draw do

  # API routes for the React frontend
  namespace :api do
    namespace :v1 do
      resources :assets, only: [:index, :create, :show, :update, :destroy] do
        member do
          patch :update_status  # API route for updating the asset's status
        end
      end

      # User registration and sign-in routes
      resources :users, only: [:create]
      post 'users/sign_in', to: 'users#sign_in'
    end
  end

end
