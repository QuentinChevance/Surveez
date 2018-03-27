Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }
  resources :session, only: [:create, :destroy, :index]
  resources :registration, only: [:index, :create, :destroy, :update]
  resources :survey, only: [:index, :create, :destroy, :update]
  resources :question, only: [:index,:create, :destroy, :update]
  resources :answer, only: [:index,:create,:destroy,:update]

end
