class RenameTypeToTypeQuestion < ActiveRecord::Migration[5.1]
  def change
    rename_column :questions, :type, :typeQuestion
  end
end
