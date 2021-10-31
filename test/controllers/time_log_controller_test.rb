require 'test_helper'

class TimeLogControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get time_log_index_url
    assert_response :success
  end

end
