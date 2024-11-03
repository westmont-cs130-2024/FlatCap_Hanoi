# config/application.rb
require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module FlatCapHanoi  # This should match your application name
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.api_only = true
    # Configuration for the application, engines, and railties goes here.
    #
    # Example:
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
