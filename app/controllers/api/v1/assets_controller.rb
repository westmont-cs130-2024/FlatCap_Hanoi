# app/controllers/api/v1/assets_controller.rb
class Api::V1::AssetsController < ApplicationController
  before_action :authenticate

  # Fetch all assets
  def index
    user = User.find(request.session['user_id'])
    @assets = Asset.includes(:beneficiaries).where(user: user).all
    render json: @assets, include: { beneficiaries: { only: [:id, :first_name, :last_name] } }
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
    updated_params = asset_params
  
    # Update timestamps for steps
    updated_params[:inventoried_at] = Time.current if updated_params[:inventoried] == true
    updated_params[:valued_at] = Time.current if updated_params[:valued] == true
    updated_params[:marshalled_at] = Time.current if updated_params[:marshalled] == true
    updated_params[:administered_at] = Time.current if updated_params[:administered] == true
  
    if @asset.update(updated_params)
      render json: @asset, status: :ok
    else
      render json: { errors: @asset.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # app/controllers/api/v1/assets_controller.rb
  def add_beneficiaries
    begin
      asset = Asset.find(params[:id])
      beneficiary_ids = params[:beneficiary_ids]

      Rails.logger.info "Attempting to add beneficiaries: #{beneficiary_ids} to asset: #{asset.id}"

      if beneficiary_ids.blank?
        Rails.logger.warn "No beneficiary_ids provided for asset: #{asset.id}"
        render json: { error: 'No beneficiaries provided' }, status: :unprocessable_entity
        return
      end

      ActiveRecord::Base.transaction do
        # Find the beneficiaries
        beneficiaries = Beneficiary.where(id: beneficiary_ids)

        # Log if we couldn't find all requested beneficiaries
        if beneficiaries.length != beneficiary_ids.length
          Rails.logger.warn "Not all beneficiary IDs were found. Requested: #{beneficiary_ids}, Found: #{beneficiaries.pluck(:id)}"
        end

        # Clear existing associations and set new ones
        asset.beneficiaries = beneficiaries
        asset.update!(administered: true)

        Rails.logger.info "Successfully updated beneficiaries for asset: #{asset.id}"

        render json: {
          asset: asset.as_json(include: {
            beneficiaries: { only: [:id, :first_name, :last_name] }
          })
        }, status: :ok
      end
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error "Asset or Beneficiary not found: #{e.message}"
      render json: { error: 'Asset or Beneficiary not found' }, status: :not_found
    rescue => e
      Rails.logger.error "Error in add_beneficiaries: #{e.class} - #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
      render json: { error: 'Failed to update beneficiaries' }, status: :unprocessable_entity
    end
  end

  private

  def asset_params
    params.require(:asset).permit(:name, :category, :acquisition_date, :location, :description, :inventoried, :valued, :marshalled, :administered, :value)
  end
end
