class Card < ApplicationRecord
  belongs_to :subject

  def subject_name=(name)
    self.subject = Subject.find_or_create_by(name: name)
  end

  def next
    next_card = Card.where('id > ?', self.id).first
    next_card = Card.first if next_card.blank?
    next_card
  end

end
