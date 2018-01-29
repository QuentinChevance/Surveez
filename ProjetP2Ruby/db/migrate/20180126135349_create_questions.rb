class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.string :title
      t.integer :type
      t.string :format
      t.string :file
      t.integer :parent_id

      t.timestamps
    end
  end
end
