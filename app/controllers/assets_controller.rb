# app/controllers/assets_controller.rb
class AssetsController < ApplicationController
  def index
    @assets = Asset.all
    @asset = Asset.new  # Used to initialize the form in the modal
  end

  # app/controllers/assets_controller.rb
  def create
    @asset = Asset.new(asset_params)
    @asset.status ||= :inventory  # Set default status if not provided

    if @asset.save
      render json: @asset, status: :created
    else
      render json: { errors: @asset.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    @asset = Asset.find(params[:id])
    @asset.destroy
    redirect_to assets_path, notice: 'Asset was successfully deleted.'
  end

  # Optional action to update status based on completed steps
  def update_status
    @asset = Asset.find(params[:id])
    if @asset.update_status(params[:completed_step])
      render json: { message: 'Status updated successfully' }, status: :ok
    else
      render json: { errors: @asset.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Remove `status` from permitted parameters since it's managed internally
  def asset_params
    params.require(:asset).permit(:name, :category, :acquisition_date, :location, :description)
  end
end
