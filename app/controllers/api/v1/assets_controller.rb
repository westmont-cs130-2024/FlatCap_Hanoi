# app/controllers/api/v1/assets_controller.rb
module Api
  module V1
    class AssetsController < ApplicationController
      def index
        assets = Asset.all
        render json: assets
      end

      def show
        asset = Asset.find(params[:id])
        render json: asset
      end

      def create
        asset = Asset.new(asset_params)
        if asset.save
          render json: asset, status: :created
        else
          render json: { errors: asset.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        asset = Asset.find(params[:id])
        if asset.update(asset_params)
          render json: asset
        else
          render json: { errors: asset.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        asset = Asset.find(params[:id])
        asset.destroy
        head :no_content
      end

      private

      def asset_params
        params.require(:asset).permit(:name, :category, :acquisition_date, :location, :description, :status)
      end
    end
  end
end
