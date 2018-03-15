class RegistrationController < ApplicationController

  skip_before_action :authenticate_user!,  :only => [:create]

  def index
    if params.has_key?(:id)
      @user = User.find(params[:id])
      render json: @user
    else
    @user = User.all
    render json: @user
    end

  end
  def create


    @user = User.new(:email => params[:email],:password => params[:password],:password_confirmation => params[:password],:firstName => params[:firstName],:lastName => params[:lastName])
    @user.nbSurvey = 0
    @user.status = 0

    if params.has_key?(:company)
      @user.company = params[:company]
    else
      @user.company = "Pas d'entreprise"
    end

    # user = User.create(email:params[:email],password:params[:password],password_confirmation:params[:password],firstName:params[:firstName],lastName:params[:lastName],nbSurvey:params[:nbSurvey],status:params[:status],company:params[:company])

    if @user.save
      render json: @user.as_json(only: [:id, :email, :firstName, :lastName, :company]), status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end

  end

  def destroy

    if User.exists?(params[:id])
      @user = User.find(params[:id])
      if @user.destroy
        head :no_content, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end

    else
      head(:unauthorized)
    end
  end

  def update

    if User.exists?(params[:id])
      @user = User.find(params[:id])
      if params.has_key?(:email)
        @user.email = params[:email]
      end
      if params.has_key?(:password)
        @user.password = params[:password]
        @user.password_confirmation = params[:password]
      end
      if params.has_key?(:firstName)
        @user.firstName = params[:firstName]
      end
      if params.has_key?(:lastName)
        @user.lastName = params[:lastName]
      end
      if params.has_key?(:company)
        @user.company = params[:company]
      end
      if params.has_key?(:nbSurvey)
        @user.nbSurvey = params[:nbSurvey]
      end
      if params.has_key?(:status)
        @user.status = params[:status]
      end
        @user.save
    else
      head(:unauthorized)
    end

    render json: @user
  end

  def user_update_params
    params.require(:user).permit(%i(:email, :password, :firstName, :lastName, :company ))
  end
end