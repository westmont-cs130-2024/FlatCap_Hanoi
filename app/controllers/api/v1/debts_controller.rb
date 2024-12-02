# app/controllers/api/v1/debts_controller.rb
class Api::V1::DebtsController < ApplicationController
  before_action :authenticate

  # Fetch all debts
  def index
    user = User.find(request.session['user_id']) # Authenticate user from session
    @debts = Debt.where(user: user).all
    render json: @debts
  end

  # Create a new debt
  def create
    user = User.find(request.session['user_id']) # Authenticate user from session
    @debt = user.debts.build(debt_params)

    if @debt.save
      render json: @debt, status: :created
    else
      Rails.logger.debug("Debt validation errors: #{@debt.errors.full_messages}")
      render json: { errors: @debt.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Update an existing debt
  def update
    @debt = Debt.find(params[:id]) # Find debt directly
    if @debt.update(debt_params)
      render json: @debt, status: :ok
    else
      render json: { errors: @debt.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Delete a debt
  def destroy
    @debt = Debt.find(params[:id]) # Find debt directly
    if @debt.destroy
      render json: { message: 'Debt was successfully deleted.' }, status: :ok
    else
      render json: { errors: 'Failed to delete the debt.' }, status: :unprocessable_entity
    end
  end

  def total_liabilities
    total_liabilities = Debt.sum('total_amount - amount_paid')  # Adjust this to fit your data model
    render json: { total_liabilities: total_liabilities }
  end

  private

  # Strong parameters for debt
  def debt_params
    params.require(:debt).permit(:name, :total_amount, :amount_paid, :category, :status)
  end
end
