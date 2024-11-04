require "test_helper"

class InitialControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get initial_create_url
    assert_response :success
  end

  test "should get log" do
    get initial_log_url
    assert_response :success
  end
end
