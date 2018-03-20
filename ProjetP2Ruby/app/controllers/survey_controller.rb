class SurveyController < ApplicationController


  def index

    if params.has_key?(:user_id)
      @survey = Survey.where(user_id: params[:user_id]).order("created_at DESC")
      render json: @survey
    else
      @surveys = Survey.order("created_at DESC")
      render json: @surveys
    end
  end

  def create

    @survey = Survey.new(:title => params[:title],:typeSurvey => params[:typeSurvey],:scope => params[:scope],:isActive => params[:isActive],:user_id => params[:user_id])
    o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    @string = (0...50).map { o[rand(o.length)] }.join

    @survey.url = @string

    if @survey.save
      render json: @survey
    else
      render json: @survey.errors, status: 201
    end

  end

  def update

    if Survey.exists?(params[:id])
      @survey = Survey.find(params[:id])
      if params.has_key?(:title)
        @survey.title = params[:title]
      end
      if params.has_key?(:scope)
        @survey.scope = params[:scope]
      end
      if params.has_key?(:isActive)
        @survey.isActive = params[:isActive]
      end
      if params.has_key?(:closeDate)
        @survey.closeDate = params[:closeDate]
      end
      @survey.save
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