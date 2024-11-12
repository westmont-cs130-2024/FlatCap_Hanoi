class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  skip_before_action :verify_authenticity_token

  private

  def authenticate
    logged_in? || render(plain: 'Not logged in', status: 401)
  end

  def logged_in?
    request.session[:user_id].present?
  end
end
