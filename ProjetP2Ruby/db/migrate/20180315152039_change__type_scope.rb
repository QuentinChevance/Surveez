class ChangeTypeScope < ActiveRecord::Migration[5.1]
  def change
    change_table :surveys do |t|
      t.change :scope, :boolean
    end
  end
end
