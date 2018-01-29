class QuestionController < ApplicationController

  def index
    @questions = Question.order("created_at DESC")
    render json: @questions
  end

  def create
    @question = Question.new(:title => params[:title],:typeQuestion => params[:typeQuestion],:format => params[:format],:file => params[:file],:parent_id => params[:parent_id],:survey_id => params[:survey_id])



    if @question.save
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def update

    if Question.exists?(params[:id])
      @question = Question.find(params[:id])
      if params.has_key?(:closeDate)
        @question.title = params[:title]
        @question.scope = params[:scope]
        @question.isActive = params[:isActive]
        @question.closeDate = params[:closeDate]
        @question.save
      else
        @question.title = params[:title]
        @question.scope = params[:scope]
        @question.isActive = params[:isActive]
        @question.save
      end
    else
      head(:unauthorized)
    end

    render json: @question
  end
  def destroy
    @question = Question.find(params[:id])
    if @question.destroy
      head :no_content, status: :ok
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  private

  # Handles the safe parameters to avoid injections
  def question_params
    params.require(:question).permit(%i( id title typeQuestion format file parent_id survey_id))
  end

  # Handles the safe parameters to avoid injections
  def question_update_params
    params.require(:question).permit(%i( title typeQuestion format file parent_id ))
  end

end