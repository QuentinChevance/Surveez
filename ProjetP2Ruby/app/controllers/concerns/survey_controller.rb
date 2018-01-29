class SurveyController < ApplicationController

  def index
    @surveys = Survey.order("created_at DESC")
    render json: @surveys
  end

  def create

    @survey = Survey.new(:title => params[:title],:url => params[:url],:typeSurvey => params[:typeSurvey],:scope => params[:scope],:publishDate => params[:publishDate],:isActive => params[:isActive],:user_id => params[:user_id])

    if @survey.save
      render json: @survey
    else
      render json: @survey.errors, status: :unprocessable_entity
    end

  end

  def update

    if Survey.exists?(params[:id])
      @survey = Survey.find(params[:id])
      if params.has_key?(:closeDate)
        @survey.title = params[:title]
        @survey.scope = params[:scope]
        @survey.isActive = params[:isActive]
        @survey.closeDate = params[:closeDate]
        @survey.save
      else
        @survey.title = params[:title]
        @survey.scope = params[:scope]
        @survey.isActive = params[:isActive]
        @survey.save


      end
    else
      head(:unauthorized)
    end


    render json: @survey
  end

  def destroy
    @survey = Survey.find(params[:id])
    if @survey.destroy
      head :no_content, status: :ok
    else
      render json: @survey.errors, status: :unprocessable_entity
    end
  end

  private

  # Handles the safe parameters to avoid injections
  def survey_params
    params.require(:survey).permit(%i( id title url type scope publishDate isActive user_id ))
  end

  # Handles the safe parameters to avoid injections
  def survey_update_params
    params.require(:survey).permit(%i( title scope isActive  ))
  end

  def survey_closedate_update_params
    params.require(:survey).permit(%i( title scope isActive closeDate ))
  end
end