class SubjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @subjects = Subject.where(:user_id => current_user.id)
  end

  def show
    @subject = Subject.find(params[:id])
    @card = Card.where(:subject_id => @subject.id).first
    redirect_to new_card_path
  end

  def create
    @subject = Subject.new(subject_params)
    @subject.user_id = current_user.id
    @subject.save
    redirect_to @subject
  end

  def new
  end

  private
    def subject_params
      params.require(:subject).permit(:name, :user_id)
    end

end
