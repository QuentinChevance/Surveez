class AddReferencesToQuestions < ActiveRecord::Migration[5.1]
  def change
    add_reference :questions, :survey, foreign_key: true
  end
end
