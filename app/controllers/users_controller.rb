class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to subjects_path(@user)
    else
      flash[:message] = @user.errors.full_messages.uniq.join(', ')
      redirect_to new_card_path
    end
  end

  def show
    redirect_to new_user_session_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
