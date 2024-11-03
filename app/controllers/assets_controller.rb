class AssetsController < ApplicationController
  def index
    @assets = Asset.all
    @asset = Asset.new  # Used to initialize the form in the modal
  end

  def create
    @asset = Asset.new(asset_params)
    if @asset.save
      redirect_to assets_path, notice: 'Asset was successfully created.'
    else
      render :index
    end
  end

  def destroy
    @asset = Asset.find(params[:id])
    @asset.destroy
    redirect_to assets_path, notice: 'Asset was successfully deleted.'
  end

  private

  def asset_params
    params.require(:asset).permit(:name, :category, :acquisition_date, :location, :description, :status)
  end
end
