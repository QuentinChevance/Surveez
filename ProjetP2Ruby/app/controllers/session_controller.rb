class SessionController < ApplicationController

  skip_before_action :authenticate_user!,  :only => [ :create, :destroy]

  def index
    user = User.where(authentication_token: request.headers[:Authorization]).first

    if user
      render :json=> {:success=>true, :id=>user.id}
    end
  end

  def create
      user = User.where(email: params[:email]).first

      if user
        if user.valid_password?(params[:password])
          sign_in("user",user)

          # render json: user.as_json(only: [:id, :email, :authentication_token]), status: :created
          render :json=> {:success=>true, :auth_token=>user.authentication_token, :email=>user.email}
        else
          head(:unauthorized)
        end
      else
        head(:unauthorized)
      end

  end

  # skip_before_action :authenticate_user!,  :only => [:create]
  #
  # respond_to :json
  #
  # def create
  #   build_resource
  #   resource = User.find_for_database_authentication(:login=>params[:user_login][:login])
  #   return invalid_login_attempt unless resource
  #
  #   if resource.valid_password?(params[:user_login][:password])
  #     sign_in("user", resource)
  #     render :json=> {:success=>true, :auth_token=>resource.authentication_token, :login=>resource.login, :email=>resource.email}
  #     return
  #   end
  #   invalid_login_attempt
  # end
  #
  def destroy
    user = User.where(id: params[:id]).first
      if user == current_user
        sign_out(user)
        render :json=> {:success=>true}
      end
  end
  #
  # protected
  # def ensure_params_exist
  #   return unless params[:user_login].blank?
  #   render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
  # end
  #
  # def invalid_login_attempt
  #   warden.custom_failure!
  #   render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  # end
end