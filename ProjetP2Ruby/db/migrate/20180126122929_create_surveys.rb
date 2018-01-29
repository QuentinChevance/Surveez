class CreateSurveys < ActiveRecord::Migration[5.1]
  def change
    create_table :surveys do |t|
      t.string :title
      t.string :url
      t.string :type
      t.string :scope
      t.date :publishDate
      t.date :closeDate
      t.boolean :isActive

      t.timestamps
    end
  end
end
