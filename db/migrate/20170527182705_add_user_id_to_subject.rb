class AddUserIdToSubject < ActiveRecord::Migration[5.0]
  def change
    add_column :subjects, :user_id, :integer
  end
end
