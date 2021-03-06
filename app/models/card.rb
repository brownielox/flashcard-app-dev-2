class Card < ApplicationRecord
  validates :front, presence: true, uniqueness: true

    belongs_to :user
    belongs_to :subject

  def subject_name=(name)
    self.subject = Subject.find_or_create_by(name: name)
  end

  def random
    self.subject.cards.sample
  end

  def next
    current_cards = self.subject.cards
    current_cards.where("id > ?", id).first || current_cards.first
  end

  def previous
    current_cards = self.subject.cards
    current_cards.where("id < ?", id).last || current_cards.last
  end

end
