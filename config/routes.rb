Rails.application.routes.draw do
  #トップページ
  root "static_pages#top"

  #プロフィール
  resources :profiles, only: %i[new create show edit update] do
    member do
      get 'icon_edit', as: 'icon_edit'
      get 'icon_edit_canvas', as: 'icon_edit_canvas'
      patch 'update_icon'
      patch 'update_tool'
    end
  end

  #作成メニューページ
  get 'static_pages/usersselect', to: 'static_pages#usersselect', as: 'usersselect'
  # get 'static_pages/newcontents', to: 'static_pages#newcontents', as: 'newcontents'
  # post 'static_pages/create_all', to: 'static_pages#create_all', as: 'create_all'

  #Sub Thing
  resources :sub_users, only: %i[index new show edit update destroy create] do
    member do
      get :confirm_delete
    end
  end
  
  #Sub Thingの追加パス
  get 'sub_users/canvas_edit/:id', to: 'sub_users#canvas_edit', as: 'canvas_edit_sub_user'
  get 'sub_users/peint_edit/:id', to: 'sub_users#peint_edit', as: 'peint_edit_sub_user'

  #Flow Thingの追加パス
  get 'items/episode_list', to: 'items#episode_list', as: 'episode_list'
  get 'items/new_canvas', to: 'items#new_canvas', as: 'new_canvas_item'
  get 'items/canvas_edit', to: 'items#canvas_edit', as: 'canvas_edit_item'

  #掲示板カテゴリー
  get 'boards/free', to: 'boards#free', as: 'free_boards'
  get 'boards/question', to: 'boards#question', as: 'question_boards'
  
  #Flow Thing
  resources :items, only: %i[index new create show edit update destroy]

  #掲示板
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

  #Screenの削除確認ページ
  resources :spaces, only: %i[index new create show edit update destroy] do
    member do
      get :confirm_delete
    end
  end

  #Flux Screenの削除確認ページ
  resources :composites, only: %i[index new create show edit update destroy] do
    member do
      get :confirm_delete
    end
  end

  #デバイスログイン
  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  resources :users, only: [:destroy]

  #ログインのパス変更
  devise_scope :user do
    get 'login', to: 'users/sessions#new'
    post 'login', to: 'users/sessions#create'
    get 'sign_up', to: 'users/registrations#new'
    delete 'logout', to: 'users/sessions#destroy'
  end

  #サンプルページ(保留)
  # get 'new_sample', to: 'static_pages#new_sample'
  # get 'sub_sample', to: 'static_pages#sub_sample'
  # get 'flow_sample', to: 'static_pages#flow_sample'
  # get 'episode_sample', to: 'static_pages#episode_sample'

  #説明ページ
  get 'info', to: 'static_pages#info'
  get 'how_to_use', to: 'static_pages#how_to_use'
  get 'idea_page', to: 'static_pages#idea_page'
  get 'idea_page_second', to: 'static_pages#idea_page_second'
  get 'idea_page_third', to: 'static_pages#idea_page_third'
  get 'tool_explanation', to: 'static_pages#tool_explanation'
  get 'tool_explanation_second', to: 'static_pages#tool_explanation_second'
  get 'tool_explanation_third', to: 'static_pages#tool_explanation_third'
  get 'tool_explanation_anime', to: 'static_pages#tool_explanation_anime'

  #ペイントツールヘルプ
  get 'paint_help', to: 'static_pages#paint_help'
end
