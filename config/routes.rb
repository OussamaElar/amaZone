Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do 
    resource :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :products, only: [:index, :show] do 
      resources :reviews, only: [:index, :show, :create, :update, :destroy]
    end
    resources :cart_items, only: [:index, :show, :create, :update, :destroy]
  end
end
