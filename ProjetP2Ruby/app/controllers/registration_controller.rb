class RegistrationController < ApplicationController
  def create

    user = User.create(email:params[:email],password:params[:password],password_confirmation:params[:password],firstName:params[:firstName],lastName:paramas[:lastName],nbSurvey:params[nbSurvey],status:params[nbSurvey],company:params[company])

    if user
      render json: user.as_json(only: [:id, :email]), status: :created
    else
      head(:unauthorized)
    end

  end

  def destroy
    user = user.find(id:params[:id])
    user.destroy

  end
end