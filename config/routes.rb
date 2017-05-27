Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :subjects, only: [:show, :index] do
    # nested resource for posts
    resources :cards, only: [:show, :index]
  end


  resources :cards, only: [:index, :show, :edit, :destroy, :new, :create, :update]

  root 'subjects#index'
  post 'subjects/new' => 'subjects#new'
  post 'cards/new' => 'cards#new'
  post 'subjects' => 'subjects#index'


end
