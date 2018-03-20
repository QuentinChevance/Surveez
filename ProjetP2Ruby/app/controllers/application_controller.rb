class ApplicationController < ActionController::API
  before_action :authenticate_user!

  def authenticate_user!
    
    if request.headers[:Authorization]
    else
      render :json => {:response => 'L\'utilisateur n\'est pas connecté' },:status => 401
    end
  end

end