class SubjectsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource only: [:edit, :show, :update]

  def index
    @subjects = Subject.all
  end

  def show
    @subject = Subject.find(params[:id])
    @card = Card.where(:subject_id => @subject.id).first
  end

  def create
    @subject = Subject.new(params[:name])
    @subject.user_id = current_user.id
    if @subject.user_id == nil
      puts "Sorry Charlie"
    else
      @subject.save
    end
  end

  def new
  end

  private
    def subject_params
      params.require(:card).permit(:name, :user_id)
    end

end
