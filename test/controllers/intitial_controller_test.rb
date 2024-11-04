require "test_helper"

class IntitialControllerTest < ActionDispatch::IntegrationTest
  test "should get log" do
    get intitial_log_url
    assert_response :success
  end
end
