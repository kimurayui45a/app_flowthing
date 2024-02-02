Rails.application.routes.draw do
  root "static_pages#top"
  resources :profiles, only: %i[new create show edit update]
  get 'static_pages/usersselect', to: 'static_pages#usersselect', as: 'usersselect'
  get 'static_pages/newcontents', to: 'static_pages#newcontents', as: 'newcontents'
  post 'static_pages/create_all', to: 'static_pages#create_all', as: 'create_all'
  resources :sub_users, only: %i[index new show edit update destroy] do
    member do
      get :confirm_delete
    end
  end
  get 'items/episode_list', to: 'items#episode_list', as: 'episode_list'
  get 'boards/free', to: 'boards#free', as: 'free_boards'
  get 'boards/question', to: 'boards#question', as: 'question_boards'
  get 'info', to: 'static_pages#info'
  
  resources :items, only: %i[index new create show edit update destroy]
  resources :boards, only: %i[index new show create destroy] do
    resources :comments, only: %i[create], shallow: true
    collection do
      get 'item_new_board'
      post 'item_board_create'
      get 'myboards_list'
    end
    member do
      get :board_confirm_delete
    end
  end
  resources :comments, only: %i[create]
  resources :categories, only: %i[show]

  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  resources :users, only: [:destroy]

  devise_scope :user do
    get 'login', to: 'users/sessions#new'
    post 'login', to: 'users/sessions#create'
    get 'sign_up', to: 'users/registrations#new'
    post 'sign_up', to: 'users/registrations#create'
    delete 'logout', to: 'users/sessions#destroy'
  end

  #サンプルページ
  get 'new_sample', to: 'static_pages#new_sample'
  get 'sub_sample', to: 'static_pages#sub_sample'
  get 'flow_sample', to: 'static_pages#flow_sample'
  get 'episode_sample', to: 'static_pages#episode_sample'
end
