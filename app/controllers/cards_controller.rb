class CardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @cards = Subject.find(params[:subject_id]).cards
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @cards}
    end
  end

  def show
    @subject = Subject.find(params[:subject_id])
    @card = (Subject.find(params[:subject_id])).cards.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @card}
    end
  end

  def card_data
    card = Card.find(params[:id])
    render json: card.to_json
  end

  def new
  end

  # def edit
  #   @card = Card.find(params[:id])
  #   respond_to do |format|
  #     format.html { render :edit }
  #     format.json { render json: @card}
  #   end
  # end

  def create
    card = Card.create(card_params)
    card.user_id = current_user.id
    card.save
    render json: card, status: 201
    # redirect_to new_card_path
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
      params.permit(:subject_id, :front, :back, :user_id)
    end

    def set_cards
      @card = Card.find(params[:id])
      @subject = Subject.find(params[:subject_id])
    end

end
