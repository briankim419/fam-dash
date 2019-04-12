Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :comments, only: [:index, :new, :create]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :photos, only: [:index, :create, :destroy, :show, :new, :edit]
    end
  end

  resources :family
  resources :invites

end
