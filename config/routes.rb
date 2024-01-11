Rails.application.routes.draw do
  root "static_pages#top"

  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks'
  }

  devise_scope :user do
    get 'login', to: 'users/sessions#new'
    post 'login', to: 'users/sessions#create'
    get 'sign_up', to: 'users/registrations#new'
    delete 'logout', to: 'users/sessions#destroy'
  end
end
