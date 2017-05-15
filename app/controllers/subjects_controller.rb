class SubjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @subjects = Subject.all
  end

  def show
    @subject = Subject.find(params[:id])
  end

  private

  def require_login
    return head(:forbidden) unless session.include? :user_id
  end
end
