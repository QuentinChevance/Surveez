class RegistrationController < ApplicationController

  def index
    @user = User.all
    render json: @user
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
        @user.email = params[:email]
        @user.password = params[:password]
        @user.password_confirmation = params[:password_confirmation]
        @user.firstName = params[:firstName]
        @user.lastName = params[:lastName]
        @user.company = params[:company]
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