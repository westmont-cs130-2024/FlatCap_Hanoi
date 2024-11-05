# app/controllers/api/v1/debts_controller.rb
class Api::V1::DebtsController < ApplicationController
  # Fetch all debts
  def index
    @debts = Debt.all
    render json: @debts
  end

  # Create a new debt
  def create
    @debt = Debt.new(debt_params)

    if @debt.save
      render json: @debt, status: :created
    else
      render json: { errors: @debt.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Update an existing debt
  def update
    @debt = Debt.find(params[:id])

    if @debt.update(debt_params)
      render json: @debt, status: :ok
    else
      render json: { errors: @debt.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Delete a debt
  def destroy
    @debt = Debt.find(params[:id])

    if @debt.destroy
      render json: { message: 'Debt was successfully deleted.' }, status: :ok
    else
      render json: { errors: 'Failed to delete the debt.' }, status: :unprocessable_entity
    end
  end

  private

  def debt_params
    params.require(:debt).permit(:name, :amount_outstanding, :amount_paid, :category, :status)
  end
end