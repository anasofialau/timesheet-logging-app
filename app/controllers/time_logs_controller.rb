class TimeLogsController < ApplicationController
  def index
  end
  
  def all_time_logs
    time_logs = TimeLog.all.order('created_at desc')
    render json: { data: time_logs }
  end

  def clock_in
    log = TimeLog.create(started_at: Time.now)
    render json: { data: log }
  end

  def clock_out
    log = TimeLog.find(params["log_id"])
    log.ended_at = Time.now
    log.save!
    render json: { data: log }
  end

  def update
    puts "UPDATING"
    log = TimeLog.find(params["log_id"])
    log.started_at = params["started_at"]
    log.ended_at = params["ended_at"]
    log.save
    render json: { data: log }
  end
end
