class RenameTypeToTypeSurvey < ActiveRecord::Migration[5.1]
  def change
    rename_column :surveys, :type, :typeSurvey
  end
end
