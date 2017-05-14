class Card < ApplicationRecord
  belongs_to :subject

  def subject_name=(name)
    self.subject = Subject.find_or_create_by(name: name)
  end

end
