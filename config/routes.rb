Rails.application.routes.draw do
  root "static_pages#top"
  resources :profiles, only: %i[new create show edit update]
  get 'static_pages/usersselect', to: 'static_pages#usersselect', as: 'usersselect'
  get 'static_pages/newcontents', to: 'static_pages#newcontents', as: 'newcontents'
  post 'static_pages/create_all', to: 'static_pages#create_all', as: 'create_all'
  resources :sub_users, only: %i[index show edit update]
  resources :items, only: %i[index new create show edit update]
  resources :episodes, only: %i[index show edit update]

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
