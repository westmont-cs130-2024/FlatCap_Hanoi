class Api::V1::UsersController < ApplicationController
  # Action to create a new user (sign-up)
  def create
    @user = User.new(user_params)

    if @user.save
      render json: { message: 'User created successfully', user: @user }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Action to sign in a user
  # app/controllers/api/v1/users_controller.rb

  def sign_in
    @user = User.find_by(email: params[:email])

    if @user && @user.password == params[:password]
      # NOTE: there is no logout method right now,
      # that should clear this session variable
      request.session['user_id'] = @user.id
      render json: { message: 'Sign-in successful', user: @user }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  # Strong parameters for user creation
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone_number, :password)
  end
end
