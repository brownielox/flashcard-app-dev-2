class Card < ApplicationRecord
  belongs_to :subject

  def subject_name=(name)
    self.subject = Subject.find_or_create_by(name: name)
  end

  def user_name=(user)
    self.user = User.find_or_create_by(email: email)
  end

  def next
    next_card = Card.where('id > ?', self.subject_id).first
    last_card = Card.where('id > ?', self.subject_id).last
    next_card = Card.where('id > ?', self.subject_id).first if next_card == last_card
    next_card
  end
end
