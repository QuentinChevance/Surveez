class AnswerController < ApplicationController
  skip_before_action :authenticate_user!,  :only => [:index,:create]


  def index

    if params.has_key?(:id)
      @answer = Answer.where(question_id: params[:id]).order("created_at DESC")
      render json: @answer

    elsif params.has_key?(:url)
      @survey = Survey.where(url: params[:url])
      @questions = Question.where(survey_id: @survey.ids)
      @answers = Answer.joins(:question).where(question_id: @questions.ids)
      render json: {
      questions: @questions,
      reponses: @answers,
      survey: @survey
    }.to_json

    else
      @answers = Answer.order("created_at DESC")
      render json: @answers
    end

  end

  def create

    @answer = Answer.new(:content => params[:content],:question_id => params[:question_id])

    if @answer.save
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end

  end

  def update

    if Answer.exists?(params[:id])
      @answer = Answer.find(params[:id])
      if params.has_key?(:content)
        @answer.content = params[:content]
      end

      @answer.save
    else
      head(:unauthorized)
    end


    render json: @answer
  end

  def destroy
    @answer = Answer.find(params[:id])
    if @answer.destroy
      head :no_content, status: :ok
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end


end