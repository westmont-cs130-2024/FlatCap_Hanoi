# config/application.rb
require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module FlatCapHanoi
  class Application < Rails::Application
    config.load_defaults 7.0
    # config.api_only = true

    # CORS configuration to allow requests from the React app
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000' # Update this to match the URL of your React app
        resource '*',
                 credentials: true,
                 headers: :any,
                 methods: %i[get post put patch delete options head]
      end
    end
  end
end
