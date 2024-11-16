# app/controllers/api/v1/assets_controller.rb
class Api::V1::AssetsController < ApplicationController
  before_action :authenticate

  # Fetch all assets
  def index
    user = User.find(request.session['user_id'])
    @assets = Asset.where(user: user).all
    render json: @assets
  end

  # Create a new asset
  def create
    user = User.find(request.session['user_id'])
    @asset = user.assets.build(asset_params)

    if @asset.save
      render json: @asset, status: :created
    else
      Rails.logger.debug("Asset validation errors: #{@asset.errors.full_messages}")
      render json: { errors: @asset.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Delete an asset
  def destroy
    @asset = Asset.find(params[:id])

    if @asset.destroy
      render json: { message: 'Asset was successfully deleted.' }, status: :ok
    else
      render json: { errors: 'Failed to delete the asset.' }, status: :unprocessable_entity
    end
  end

  def update
    @asset = Asset.find(params[:id])
    if @asset.update(asset_params)
      render json: @asset, status: :ok
    else
      render json: { errors: @asset.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def asset_params
    params.require(:asset).permit(:name, :category, :acquisition_date, :location, :description)
  end
end
