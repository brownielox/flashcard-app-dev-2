class CardsController < ApplicationController
  before_action :authenticate_user!

  def index
    subject = Subject.find(params[:id])
    card = Card.find(params[:id])
    render json: CardSerializer.serialize(card)
  end

  def show
    subjects = Subject.all
    card = Card.find(params[:id])
    render json: card.to_json
  end

  def card_data
    card = Card.find(params[:id])
    render json: card.to_json
  end

  def new
  end

  def edit
    @card = Card.find(params[:id])
  end

  def create
    @card = Card.create(card_params)
    @card.user_id = current_user.id
    @card.save
    redirect_to new_card_path
  end

  def update
    @card = Card.find(params[:id])

    if @card.update(card_params)
      redirect_to subjects_path
    else
      render 'edit'
    end
  end

  def destroy
    @card = Card.find(params[:id]).destroy
    redirect_to subjects_path
  end

  private
    def card_params
      params.require(:card).permit(:subject_name, :front, :back, :user_id)
    end

    def set_cards
      @card = Card.find(params[:id])
      @subject = Subject.find(params[:subject_id])
    end

end
