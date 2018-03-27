class QuestionController < ApplicationController


  def index
    if params.has_key?(:id)
      @question = Question.where(question_id: params[:id]).order("created_at DESC")
      render json: @question
    else
      @questions = Question.order("created_at DESC")
      render json: @questions
    end
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
    if params.has_key?(:id)


    if Question.exists?(params[:id])
      @question = Question.find(params[:id])
      if params.has_key?(:title)
        @question.title = params[:title]
      end
      if params.has_key?(:parent_id)
        @question.parent_id = params[:parent_id]
      end
      if params.has_key?(:file)
        @question.file = params[:file]
      end

      @question.save
    else
      head(:unauthorized)
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