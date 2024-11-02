require "test_helper"
require "pry"

class AssetTest < ActiveSupport::TestCase
  
  # try updating the asset name
  context "an existing asset" do
    setup do 
      @asset = Asset.last
    end

    should "allow updating the name" do
      assert_not_equal "Main Lake House", @asset.name

      @asset.update!(name: "Main Lake House")
      assert_equal "Main Lake House", @asset.name
    end

  end

  # try creating a new asset
  context "creating a new asset" do
    @asset.create!(name: "Main Lake House", description: "a beautiful lake hosue", category: "property" )
  end


end
