class RemoveUserIdFromSubjects < ActiveRecord::Migration[5.0]
  def change
    remove_column :subjects, :user_id, :integer
  end
end
