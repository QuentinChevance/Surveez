class AddFieldsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :firstName, :string
    add_column :users, :lastName, :string
    add_column :users, :nbSurvey, :integer
    add_column :users, :status, :integer
    add_column :users, :company, :string
  end
end
