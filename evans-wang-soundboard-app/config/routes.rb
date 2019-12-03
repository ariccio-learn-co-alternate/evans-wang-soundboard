Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get '/sounds', to: 'sounds#list'
    get '/sounds/:id', to: 'sounds#show'
  end
end
