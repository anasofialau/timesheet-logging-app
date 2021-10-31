Rails.application.routes.draw do
  root "time_logs#index"
  get 'time_logs/all_time_logs'

  get 'time_logs/clock_in'
  get 'time_logs/clock_out'

  # put 'time_logs/:id'

end
