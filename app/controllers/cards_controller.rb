class CardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @cards = Card.all
  end

  def show
    @card = Card.find(params[:id])
    @next = Card.where('id > ?', @card.id).first
    @next = Card.first if @next.nil?
  end

  def new
  end

  def edit
    @card = Card.find(params[:id])
  end

  def create
    @card = Card.new(card_params)

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
      params.require(:card).permit(:subject_name, :front, :back)
    end

end
