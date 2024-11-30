class Api::V1::BeneficiariesController < ApplicationController
  before_action :authenticate

  # GET /api/v1/beneficiaries
  def index
    user = User.find(request.session['user_id'])

    # Check if we want to include assets
    if params[:include_assets] == 'true'
      @beneficiaries = user.beneficiaries.includes(assets: :beneficiaries)
      render json: @beneficiaries, include: {
        assets: {
          only: [:id, :name, :value, :valued],
          methods: [:beneficiary_ids]
        }
      }
    else
      @beneficiaries = user.beneficiaries.includes(:assets)
      render json: @beneficiaries, include: {
        assets: { only: [:id, :name] }
      }
    end
  end

  # POST /api/v1/beneficiaries
  def create
    user = User.find(request.session['user_id'])  # Retrieve the user based on the session
    @beneficiary = user.beneficiaries.build(beneficiary_params)

    if @beneficiary.save
      render json: @beneficiary, status: :created
    else
      Rails.logger.debug("Beneficiary validation errors: #{@beneficiary.errors.full_messages}")
      render json: { errors: @beneficiary.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/beneficiaries/:id
  def update
    @beneficiary = Beneficiary.find(params[:id])  # Find the beneficiary by ID

    if @beneficiary.update(beneficiary_params)
      render json: @beneficiary, status: :ok
    else
      render json: { errors: @beneficiary.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/beneficiaries/:id
  def destroy
    @beneficiary = Beneficiary.find(params[:id])  # Find the beneficiary by ID

    if @beneficiary.destroy
      render json: { message: 'Beneficiary was successfully deleted.' }, status: :ok
    else
      render json: { errors: 'Failed to delete the beneficiary.' }, status: :unprocessable_entity
    end
  end

  private

  # Authenticate the user
  def authenticate
    @current_user = User.find(request.session['user_id'])
    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end

  # Strong parameters to whitelist beneficiary attributes
  def beneficiary_params
    params.require(:beneficiary).permit(:first_name, :last_name, :email, :notes)
  end
end
