class TimeLogsController < ApplicationController
  skip_before_action :verify_authenticity_token

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
    log = TimeLog.find(params["id"])
    log.started_at = params["time_log"]["started_at"]
    log.ended_at = params["time_log"]["ended_at"]
    log.save
    render json: { data: log }
  end
end
