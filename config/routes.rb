Rails.application.routes.draw do
  root "time_logs#index"
  get 'time_logs/all_time_logs'

  post 'time_logs/clock_in'
  post 'time_logs/clock_out'

  resources :time_logs, only: [:update]
end
