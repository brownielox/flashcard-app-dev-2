class CardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @cards = Card.all
  end

  def show
    @card = Card.find(params[:id])
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
    redirect_to @card
  end

  def update
    @card = Card.find(params[:id])

    if @card.update(card_params)
      redirect_to @card
    else
      render 'edit'
    end
  end

  private
    def card_params
      params.require(:card).permit(:subject_name, :front, :back, :user_id)
    end

end
