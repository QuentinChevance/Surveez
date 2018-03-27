require 'test_helper'

class SurveyTest < ActiveSupport::TestCase
   test "Failed without information" do
     @Survey = Survey.new()
     assert !@Survey.save, "Saved the survey without information"
   end

   test "Success with all information" do
    @Survey = Survey.new(:title => "Ceci est le titre du Survey",:typeSurvey => params[:typeSurvey],:scope => params[:scope],:publishDate => params[:publishDate],:isActive => params[:isActive],:user_id => params[:user_id])
    assert @Survey.save, "Savec the survey with all information"
   end
end
