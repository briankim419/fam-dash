Rails.application.routes.draw do
  get 'controller/todoitems'
  get 'controller/todolists'
  root 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :comments, only: [:index, :new, :create]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :photos, only: [:index, :new, :create, :show]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :families, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :chats, only: [:index, :new, :create, :show]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :families, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :posts, only: [:index, :new, :create, :show]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :families, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :todoitems, only: [:index, :new, :create, :show, :edit, :destroy]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :families, only: [:index, :create, :destroy, :show, :new, :edit] do
        resources :photos, only: [:index, :new, :create, :show]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :photos, only: [:index, :create, :destroy, :show, :new, :edit]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :families, only: [:index, :show, :create]
    end
  end

  namespace :api do
  namespace :v1 do
    resources :messages, only: [:create, :show]
    resources :users, only: [:index]
    end
  end

  resources :families, only: [:index, :show, :new] do
    resources :chats, only: [:index, :new, :create, :show]
  end

  resources :families, only: [:index, :show, :new] do
    resources :todoitems, only: [:index, :new, :create, :show, :edit]
  end

  resources :families
  resources :invites
  devise_for :users, :controllers => {:registrations => "users/registrations"}

  resources :chats

end
