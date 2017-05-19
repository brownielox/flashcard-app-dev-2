class Card < ApplicationRecord
  belongs_to :subject

  def subject_name=(name)
    self.subject = Subject.find_or_create_by(name: name)
  end

  def next
    Card.where("id > ?", id).order("id ASC").first || Card.first
  end

  def previous
    Card.where("id < ?", id).order("id DESC").first || Card.last
  end

end
