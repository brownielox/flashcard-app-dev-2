class SessionsController < ApplicationController

  def new
    @user = User.new
    @users = User.all
  end

  def create
    user = User.find_by(name: params[:user][:username])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to subjects_path
    else
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to new_user_session_path
  end

end
