class Question < ApplicationRecord
  belongs_to :survey
  has_many :answers

  def as_json(options={})
    {
        id: id,
        title: title,
        typeQuestion: typeQuestion,
        format: format,
        file: file,
        parent_id: parent_id,
        survey_id: survey_id
    }.as_json(options)
  end
end
