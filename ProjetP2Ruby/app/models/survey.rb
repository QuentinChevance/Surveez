class Survey < ApplicationRecord
  belongs_to :user

    def as_json(options={})
      {
          id: id,
          title: title,
          url: url,
          typeSurvey: typeSurvey,
          scope: scope,
          publishDate: publishDate,
          closeDate: closeDate,
          isActive: isActive,
          user_id: user_id
      }.as_json(options)
    end

  has_many :questions
  
end
