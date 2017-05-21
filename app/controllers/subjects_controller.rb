class SubjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @subjects = User.find_by_id(current_user.id).subjects
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

  def cards_index
    @subject = Subject.find(params[:id])
    @cards = @subject.cards
    render template: 'cards/index'
  end

  def cards
    @subject = Subject.find(params[:id])

    # Note that because ids are unique by table we can go directly to
    # Post.find — no need for @author.posts.find...
    @card = Card.find(params[:card_id])
    render template: 'cards/show'
  end

  private
    def subject_params
      params.require(:subject).permit(:name, :user_id)
    end

end
