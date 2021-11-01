require 'test_helper'

class TimeLogControllerTest < ActionDispatch::IntegrationTest
  test "should get all time log entries" do
    get time_logs_all_time_logs_url
    assert_response :success
  end

  test "should clock in" do
    post time_logs_clock_in_url
    assert_response :success
  end

  test "should save username when clocking in" do
    post time_logs_clock_in_url, params: {username: 'Ana Lau'}
    assert_response :success
    assert_equal TimeLog.last.username, "Ana Lau"
  end

  test "should clock out" do
    t = TimeLog.create(started_at: Time.now)
    post time_logs_clock_out_url, params: {log_id: t.id}
    assert_response :success
  end

  test "should save username when clocking out" do
    t = TimeLog.create(started_at: Time.now)
    post time_logs_clock_out_url, params: {log_id: t.id, username: 'Ana Lau'}
    assert_response :success
    assert_equal TimeLog.last.username, "Ana Lau"
  end

  test "should update" do
    t = TimeLog.create(started_at: Time.now - 1.days, ended_at: Time.now - 1.days)
    put time_log_url(t.id), params: {time_log: {started_at: Time.now, ended_at: Time.now}}
    assert_response :success
  end

  test "should not update for invalid dates" do
    t = TimeLog.create(started_at: Time.now - 1.days, ended_at: Time.now - 1.days)
    assert_raises(ActiveRecord::RecordInvalid) do
      put time_log_url(t.id), params: {time_log: {started_at: Time.now, ended_at: Time.now - 2.days}}
    end
  end
end
