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
          user_id: user_id,
          created_at: created_at,
          updated_at: updated_at
      }.as_json(options)
    end

  has_many :questions
  
end
