class SubjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @subjects = current_user.subjects
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @subjects}
    end
  end

  def show
    @subject = Subject.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @subject}
    end
  end

  def create
    subject = Subject.create(subject_params)
    subject.user_id = current_user.id
    subject.save
    render json: subject, status: 201
  end

  def new
  end

  def cards_index
    @subject = Subject.find(params[:id])
    @cards = @subject.cards
    render template: 'cards/index'
  end

  def cards
    @subject = Subject.find(params[:id])
    @card = Card.find(params[:card_id])
    render template: 'cards/show'
  end

  private
    def subject_params
      params.permit(:name, :user_id)
    end

end
