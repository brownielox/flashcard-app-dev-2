class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied do |exception|
  redirect_to root_url, :alert => exception.message
end

  protect_from_forgery with: :null_session

  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

end
