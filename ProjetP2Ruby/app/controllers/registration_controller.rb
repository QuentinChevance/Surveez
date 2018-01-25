class RegistrationController < ApplicationController
  def create


    @user = User.new(:email => params[:email],:password => params[:password],:password_confirmation => params[:password],:firstName => params[:firstName],:lastName => params[:lastName],:nbSurvey => params[:nbSurvey],:status => params[:status],:company => params[:company])

    # user = User.create(email:params[:email],password:params[:password],password_confirmation:params[:password],firstName:params[:firstName],lastName:params[:lastName],nbSurvey:params[:nbSurvey],status:params[:status],company:params[:company])

    if @user.save
      render json: @user.as_json(only: [:id, :email, :firstName, :company, :status]), status: :created
    else
      head(:unauthorized)
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
      @user&.update_attributes(user_update_params)
      render json: @user
    else
      head(:unauthorized)
    end
  end

  def user_update_params
    params.require(:user).permit(%i(:email, :password, :firstName, :lastName, :company ))
  end
end