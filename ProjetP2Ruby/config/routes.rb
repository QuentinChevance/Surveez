Rails.application.routes.draw do
  devise_for :users
  resources :session, only: [:create, :destroy]
  resources :registration, only: [:index, :create, :destroy, :update]
  resources :survey, only: [:create, :destroy, :update]
  resources :question, only: [:index,:create, :destroy, :update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
